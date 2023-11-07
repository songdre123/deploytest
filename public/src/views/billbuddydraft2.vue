
<template>

    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="left col mt-7 mb-4 ml-7">
        <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">tokyo's</a> expenses</h1>
        <div class="card bg-white rounded-md mt-3 ml-3 mr-3 gap-1 grid grid-cols-12">
              <!-- icon -->
              <div class="rectangle col-span-1 flex w-10 bg-blue-400 h-10 rounded-lg justify-center items-center">
                <img class="w-7 h-auto" src="../assets/expenses/food.png">
              </div>
              <!-- description -->
              <div class=" col-span-5 flex justify-center items-center">
                <h2 class="text-xl">Hamburger</h2>
              </div>
              <div class="col-span-4">
                <div class="subheader">
                  <h2 class="text-lg">$24</h2>
                  <h3 class="text-sm">Paid by Timmy</h3>
                </div>
              </div>
              
                <div class="flex justify-center items-center col-span-1">
                  <button class="btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </button>
                </div>
              
              
                <div class="flex justify-center items-center col-span-1">
                  <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                  </button>
                </div>
              </div>

              
         </div>


      

      <div class="right col mt-7 ml-7 mr-7">
        <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">splitter</a></h1>
        <div class="right col col-span-1">
          <div class="grid grid-cols-3  mt-4">
            <div class="w-fit text-center">
              <div class="circle rounded-full w-20 h-20 bg-white">
                <img src="../assets/expenses/people/p1.png">
              </div>

              <div class="amount and name ">
                <h2 class="text-xl">Timmy</h2>
              </div>
            </div>
            <div class="pays">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <h3>pays $30 to</h3>
            </div>
            <div class="whotopay">
              <div class="circle rounded-full w-20 h-20 bg-white">
                <img src="../assets/expenses/people/p1.png">
              </div>
              <div class="amount and name">
                <h2 class="text-xl">Johnny</h2>
              </div>
            </div>
          </div> 
          

      </div>
      
      </div>
      
    </div>
        
            
            



    
</template>

<script>

// Importing the functions we need from firebase
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc
} from "firebase/firestore";



// Declaring the database data points we need
const db = getFirestore();
const tripsRef = collection(db, 'trips');

// Display trips
function tripExists() {
  if (
    getDocs(tripsRef).then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return false;
      } else {
        // console.log('Document data:', querySnapshot.docs);
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
      trip: null,
      quicksettleamount: [],
      percentages: [],
      shares: [],
      custom: [],
      selected: false,
    }
  },
  computed: {
    selectedTrip() {
      return this.trip;
    }
  },

  // Methods for adding data to firebase
  methods: {
    goToTrip(trip) {
      console.log(trip);
      this.trip = trip;
      this.selected = true;

      getDocs(collection(tripsRef, this.trip, 'expenses')).then((querySnapshot) => {
        if (this.expenses.length > 0) {
          this.expenses = [];
        }
        if (this.docId.length > 0) {
          this.docId = [];
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.docId.push(doc.id);
          this.expenses.push(doc.data());
        });
      });

      getDoc(doc(tripsRef, this.trip)).then(doc => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          this.whoOwesWho = doc.data().whoOwesWho;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      const querySnapshot1 = getDocs(doc(tripsRef, this.trip));
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.whoOwesWho = doc.data();
        console.log(this.whoOwesWho)
      });
    },
    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    async addExpense() {
      // Assigns the value of list to the peopleOwingNames object
      this.expense.peopleOwingNames = this.list;
      console.log(this.expense.peopleOwingNames);
      // Assigns the amount owed to peopleOwingAmount object
      var peopleOwingAmount = Number((this.expense.expenseAmount / this.expense.peopleOwingNames.length).toFixed(2));
      this.expense.peopleOwingAmount = peopleOwingAmount;

      // Adds the expense to the database
      addDoc(collection(db, 'trips', this.trip, 'expenses'), this.expense)
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
      updateDoc(doc(tripsRef, this.trip), {
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
      console.log(docId)
      console.log(index)
      deleteDoc(doc(tripsRef, this.trip, 'expenses', docId[index]))
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Update expense in database
    async updateExpense(index, docId) {
      updateDoc(collection(tripsRef, this.trip, 'expenses'), docId[index]), {
        expenseName: "Updated Expense Name",
        expenseAmount: 100,
        peopleOwingNames: ["Updated Name 1", "Updated Name 2"],
        peopleOwingAmount: 50,
        personOwedName: "Updated Person Owed Name"
      }
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
    getDocs(tripsRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        this.trips.push(doc.id);
      });
    });

    onSnapshot(collection(tripsRef, this.trip, 'expenses'), (querySnapshot) => {
      if (this.expenses.length > 0) {
        this.expenses = [];
      }
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.docId.push(doc.id);
        this.expenses.push(doc.data());
      });
    });

    const querySnapshot1 = await getDocs(doc(tripsRef, this.trip, 'whoOwesWho'));
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });
  },
}
</script>