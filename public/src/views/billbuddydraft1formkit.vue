<template>
  
        <div class="header m-7">
            <h2>Your current trips</h2>
        </div>
  <!-- need to insert a v-if here if there are current trips -->
        <div v-if="tripExists">
            <div class="grid grid-cols-4 gap-4 mt-4 ml-7">
                <div class="card" v-for="trip in trips">
                    <div class="card title text-black">
                        <button hover:shadow-lg @click="goToTrip(trip)"><h3>{{trip}}</h3></button>
                    </div>
                    <div class="card card-actions">
                        <!--Add people who owe money here-->
                    </div>

                </div>
            </div>
        </div>
        <div v-if="!tripExists" class="text-xl m-7 italic">
            <h3>You currently have no trips.</h3>
            <RouterLink to="/edit-trip"><button class="btn">Add a trip!</button></RouterLink>
        </div>

        <div class="flex flex-wrap items-center justify-center w-10/12">
            <div class="form">
                <FormKit 
                type="form"
                form-class="outer-container"
                :config="{
                validationVisibility: 'dirty',
                }"
                :submit-attrs="{
                  
                }"
                >
                    <h3>Split your expenses</h3>
                    <h4>Fill in the fields below and we will help you split them!</h4>
                    &nbsp;
                    <FormKit
                    v-model="expense.expenseName"
                    label="Expense name"
                    validation="required|length:3"
                    placeholder="Tokyo with Timmy"
                  />
                  <FormKit
                    type="number"
                    label="Expense amount"
                    validation="required|min:1"
                    placeholder="500"
                    :validation-messages="{
                      'min':'Your expenses should be more than one!'
                    }"
                  />
                  <FormKit
                    label="Person owed"
                    help="Who paid?"
                    placeholder="Me"
                    validation="required"
                    v-model="expense.personOwedName"

                  />
                    
                  <!-- the box size decreases when i try to type in more names -->
                  
                  <FormKit type="form" #default="{ value }" :actions="false">
                    <FormKit
                      type="taglist"
                      name="peopleowed"
                      v-model="inputValue"
                      label="Who owes money?"
                      :allow-new-values="true"
                    ></FormKit>
                  </FormKit>

                  <FormKit
                      type="submit"
                      name="peopleowed"
                      v-model="inputValue"
                      label="Who owes money?"
                      :allow-new-values="true"
                    ></FormKit>
                </FormKit>

          

                

            </div>
                
        </div>
        




    
    
        


    


</template>

<script>

// Importing the functions we need from firebase
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc
} from "firebase/firestore";

import navbar from "../components/navbar.vue";

// Declaring the database data points we need
const db = getFirestore();
const tripsRef = collection(db, 'trips');
const expensesRef = collection(tripsRef, 'europe', 'expenses');
const whoOwesWhoRef = collection(tripsRef, 'europe', 'whoOwesWho');

// Display trips
function tripExists() {
  if (
    getDocs(tripsRef).then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return false;
      } else {
        console.log('Document data:', querySnapshot.docs);
        return true;
      };
    })
  ) {
    return true;
  } else {
    return false;
  }
}

// Exporting the data to firebase
export default {
  data() {
    return {
      // Objects of data we want to add to firebase
      expense: {
        expenseName: null,
        expenseAmount: null,
        peopleOwingNames: null,
        personOwedName: null,
        peopleOwingAmount: null
      },
      expenses: [],
      docId: [],
      whoOwesWho: {},
      // This is for the list of people who owe money
      inputValue: '',
      list: [],
      splitmethod: null,
      tripExists: tripExists(),
      trips: [],
      quicksettleamount: [],
      percentages: [],
      shares: [],
      custom: [],
    }
  },

  // Methods for adding data to firebase
  methods: {
    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    async addExpense() {
      // Assigns the value of list to the peopleOwingNames object
      this.expense.peopleOwingNames = this.list;
      console.log(this.expense.peopleOwingNames);
      // Assigns the amount owed to peopleOwingAmount object
      var peopleOwingAmount = Number((this.expense.expenseAmount / this.expense.peopleOwingNames.length).toFixed(2));
      this.expense.peopleOwingAmount = peopleOwingAmount;

      // Adds the expense to the database
      addDoc(expensesRef, this.expense)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Adding the expense to the whoOwesWho collection
      // 1. Check if the personOwedName is already in the whoOwesWho collection
      if (this.expense.personOwedName in this.whoOwesWho) {
        console.log("Person already in whoOwesWho")
        // 2. If it is, add the expenseAmount to the existing amount
        this.whoOwesWho[this.expense.personOwedName] -= this.expense.expenseAmount;
      } else {
        console.log("Person not in whoOwesWho")
        // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
        this.whoOwesWho[this.expense.personOwedName] = Number(-this.expense.expenseAmount);
      }
      // 1. Check if the peopleOwingNames is already in the whoOwesWho collection
      for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
        console.log(this.expense.peopleOwingNames[i]);
        if (this.expense.peopleOwingNames[i] in this.whoOwesWho) {
          console.log("Person already in whoOwesWho")
          // 2. If it is, add the peopleOwingAmount to the existing amount
          this.whoOwesWho[this.expense.peopleOwingNames[i]] += this.expense.peopleOwingAmount;
        } else {
          console.log("Person not in whoOwesWho")
          // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
          this.whoOwesWho[this.expense.peopleOwingNames[i]] = this.expense.peopleOwingAmount;
        }
      }
      // Update the whoOwesWho collection in firebase
      updateDoc(doc(tripsRef, 'europe'), {
        whoOwesWho: this.whoOwesWho
      })
        .then(() => {
          console.log("whoOwesWho successfully updated!");
          console.log(this.whoOwesWho)
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      // Reset the values of the expense object
      this.expense.expenseName = null;
      this.expense.expenseAmount = null;
      this.expense.peopleOwingNames = null;
      this.expense.personOwedName = null;
      this.expense.peopleOwingAmount = null;
      this.list = [];

    },

    // Supporting function for addExpense()
    addToList() {
      this.list.push(this.inputValue);
      this.inputValue = '';
      this.list = this.list.sort();
    },

    // Supporting function for addExpense()
    removeFromList(index) {
      this.list.splice(index, 1);
    },

    // Function to breakeven expenses
    breakeven() {
      console.log(this.whoOwesWho)
      for (let key in this.whoOwesWho) {
        if (this.whoOwesWho[key] > 0) {
          console.log(key + " owes " + this.whoOwesWho[key]);
        } else if (this.whoOwesWho[key] < -0.011) {
          console.log(key + " is owed " + -this.whoOwesWho[key]);
        } else {
          console.log(key + " is breakeven");
        }
        console.log(key)
        while (this.whoOwesWho[key] > 0) {
          for (let key2 in this.whoOwesWho) {
            if (this.whoOwesWho[key2] < 0) {
              if (this.whoOwesWho[key] > -this.whoOwesWho[key2]) {
                console.log(key + " pays " + -this.whoOwesWho[key2] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + -this.whoOwesWho[key2] + " to " + key2 + "<br>";
                this.whoOwesWho[key] += this.whoOwesWho[key2];
                this.whoOwesWho[key2] = 0;
              } else if (this.whoOwesWho[key] != 0) {
                console.log(key + " pays " + this.whoOwesWho[key] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + this.whoOwesWho[key] + " to " + key2 + "<br>";
                this.whoOwesWho[key2] += this.whoOwesWho[key];
                this.whoOwesWho[key] = 0;
              }
            }
          }
        }

      }

    },

    // Delete expense from database
    async deleteExpense(index, docId) {
      deleteDoc(doc(expensesRef, docId[index]))
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Update expense in database
    async updateExpense(index, docId) {
      updateDoc(doc(expensesRef, docId[index]), {
        expenseName: "Updated Expense Name",
        expenseAmount: 100,
        peopleOwingNames: ["Updated Name 1", "Updated Name 2"],
        peopleOwingAmount: 50,
        personOwedName: "Updated Person Owed Name"
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    checkempty() {
      if (this.expense.expenseName == null || this.expense.expenseAmount == null || this.expense.personOwedName == null || this.list.length == 0) {
        alert("Please fill in all fields")
      } else {
        this.addExpense();
      }
    },

    computeexpense() {
      this.quicksettleamount = [];
      let amount = this.expense.expenseAmount;
      if (this.custom.length > 0) {
        let sum = 0
        for (let i = 0; i < this.custom.length; i++) {
          sum += this.custom[i];
        }
        if (sum != this.expense.expenseAmount) {
          alert("Please make sure the percentages add up to the amount owed!")
        }
        else {
          for (let i = 0; i < this.custom.length; i++) {
            this.quicksettleamount.push(this.custom[i]);
          }
        }
      }
      if (this.shares.length > 0) {
        let totalshares = 0;
        for (let i = 0; i < this.shares.length; i++) {
          totalshares += this.shares[i];
        }
        for (let i = 0; i < this.shares.length; i++) {
          this.quicksettleamount.push(this.shares[i] * amount / totalshares);
        }
      }
      if (this.percentages.length > 0) {
        let totalpercentage = 0;
        for (let i = 0; i < this.percentages.length; i++) {
          totalpercentage += this.percentages[i];
        }
        if (totalpercentage != 100) {
          alert("Please make sure the percentages add up to 100!")
        }
        else {
          for (let i = 0; i < this.percentages.length; i++) {
            this.quicksettleamount.push(this.percentages[i] * amount / 100);
          }


        }

      }

    }
  },
  async created() {
    // const querySnapshot = await getDocs(expensesRef);
    onSnapshot(expensesRef, (querySnapshot) => {
      if (this.expenses.length > 0) {
        this.expenses = [];
      }
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.docId.push(doc.id);
        this.expenses.push(doc.data());
      });
    });

    const querySnapshot1 = await getDocs(whoOwesWhoRef);
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });

    getDocs(tripsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.trips.push(doc.id);
      });
    })
  },

}

</script>


<style>
.outer-container {
  width: 500px;
  border: 1px solid #e4e4e4;
  padding: 1.5em;
  border-radius: 1em;
  margin: 0 auto 1em auto;
  background-color: lightskyblue;
}

.input-group {
  display: flex;
  gap: 1em;
}

h1,
h3 {
  text-align: center;
}
</style>
