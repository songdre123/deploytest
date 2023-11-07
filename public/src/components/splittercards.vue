<script>
export default {
    props: {
        Name1: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        Name2: {
            type: String,
            required: true,
        },
    },

};
</script>

<template>
    <div class="grid grid-cols-3  mt-4">
            <div class="w-fit text-center">
              <div class="circle rounded-full w-20 h-20 bg-white">
                <img src="../assets/expenses/people/p1.png">
              </div>

              <div class="amount and name ">
                <h2 class="text-xl">{{Name1}}</h2>
              </div>
            </div>
            <div class="pays">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <h3>pays ${{amount}} to</h3>
            </div>
            <div class="whotopay">
              <div class="circle rounded-full w-20 h-20 bg-white">
                <img src="../assets/expenses/people/p1.png">
              </div>
              <div class="amount and name">
                <h2 class="text-xl">{{Name2}}</h2>
              </div>
            </div>
        </div> 
</template>

