<!-- old app.vue for reference -->
<script setup>

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }
    else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).thenn(() => {
    router.push("/");
  })
};
</script>

<template>
 <div id='body' style="background-color: lightblue;">
  <nav>
    <nav class="navbar navbar-dark"
      aria-label="Second navbar example">
      <div class="container-fluid">

        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="collapse navbar-collapse" id="navbarsExample02">
          <div class="navbar-nav">
            <span style="color: black;">[LOGO]</span>
            <router-link to="/"><button class='navbar-btn'>Home</button></router-link>
            &nbsp; 
            <router-link to="/itinerary"><button class='navbar-btn'>Itinerary</button></router-link> 
            &nbsp;
            <router-link to="/toolpage"><button class='navbar-btn'>Tools</button></router-link> 
            &nbsp;
            <router-link to="/feed"><button class='navbar-btn'>Feed</button></router-link> 
            &nbsp;
            <router-link to="/billbuddy"><button class='navbar-btn'>BillBuddy</button></router-link> 
            &nbsp;
            <router-link to="/register"><button class='navbar-btn'>Register</button></router-link> 
            &nbsp;
            <router-link to="/sign-in"><button class='navbar-btn'>Login</button></router-link> 
            &nbsp;
            <router-link to="/profile"><button class='navbar-btn' style="color: blue;">Profile</button></router-link> 
          </div>
          <!-- <div id='logo' class="position-absolute top-0 start-50 translate-middle-x">
            <a href="#"><img src="./components/logo/itiner-easy.svg" style="width: 100px; height: 100px; margin-top: -15px;"
                alt="itiner-easy logo"></a>
          </div> -->
        </div>
      </div>
    </nav>


    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <router-view />
</div>
</template>

<style scoped>

body {
  background-color: #05c8f7;
  height: 100vh;
}

/* LOGO */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  margin: 0;
  padding: 0;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* NAVBAR ELEMENTS */
.navbar-btn {
  display: flex-horizontal;
  background-color: #05c8f7;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  text-decoration: none;
  margin: 0px 10px;
}
.navbar-btn:hover {
  text-decoration: underline;
  border: 1px solid #05c8f7;
}

.navbar {
  display: flex;
  background-color: #05c8f7;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  position: absolute;
  top: 5px;
}

.navbar-nav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>