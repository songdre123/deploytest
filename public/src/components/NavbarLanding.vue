<template>
    <nav class="bg-white shadow-lg fixed top-0 w-full z-50">
      <div class="container mx-auto py-4 flex justify-between items-center">
        <a @click="scrollToTop" class="cursor-pointer">
          <img src="src/components/logo/itiner-easy.png" alt="Logo" class="h-24" />
        </a>
        <router-link to="/sign-in" class="bg-blue-500 text-white px-4 py-2 rounded-full">
          Login
        </router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  </script>
  