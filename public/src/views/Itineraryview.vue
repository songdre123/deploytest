<template>
    <div id>
        

    </div>
</template>

<script>
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc, setDoc, query, getDoc
} from "firebase/firestore";
const db = getFirestore();
const tripsRef = collection(db, 'trips');


</script>