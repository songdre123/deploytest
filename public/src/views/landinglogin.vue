<template>
    <div>
        <Header></Header>
    </div>
    <!-- title -->
    <div class="mt-7 mb-4 ml-7">
        <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">Ralph's</a> current trips</h1>
    </div>
    <!-- trips carousell cards -->
    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
        <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl m-2">Mt. Fuji</h2>
            <h3 class="text-base">A _ day trip to Tokyo</h3>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Taiwan</h2>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Malaysia</h2>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Singapore</h2>
        </div>
    </section>
    <!-- expenses -->
    <div class="ml-7 mb-4">
        <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">Ralph's</a> current expenses</h1>
    </div>
    
    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
        <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl m-2">Tokyo</h2>
            <h3 class="text-base">John, Robert, Carrie</h3>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Taiwan</h2>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Malaysia</h2>
        </div>
        <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
            <img class="w-56 md:w-64" src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
            <h2 class="text-xl">Singapore</h2>
        </div>
    </section>
    
    <div class="mb-4">
        <h1 class="text-2xl ml-7 md:text-3xl">Toolkit</h1>
        <h4 class="ml-7 italic">Travelling has never been easier.</h4>
        <div class="mt-2 ml-7 mr-7 ">
        <!-- tools -->
        <div class="flex flex-wrap">
        <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px w-1/4 mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-blue-900 bg-white': openTab !== 1, 'text-white bg-blue-900': openTab === 1}">
            Translator
          </a>
        </li>
        <li class="-mb-px mr-2 w-1/4 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-blue-900 bg-white': openTab !== 2, 'text-white bg-blue-900': openTab === 2}">
            Currency converter
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <Translator></Translator>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <Currency></Currency>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    


</template>


<script setup>
import Header from "../components/header.vue"
import Translator from "../components/Tools/translator.vue"
import Currency from "../components/Tools/currencyconverter.vue"
</script>


<script>
    export default {
    name: "lightBlue-tabs",
    data() {
        return {
        openTab: 1
        }
    },
    methods: {
        toggleTabs: function(tabNumber){
        this.openTab = tabNumber
        }
    }
    }
</script>