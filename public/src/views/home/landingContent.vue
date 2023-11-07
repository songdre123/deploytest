<template>
    <div class="bg-gradient-to-b from-neutral-400 to-blue-200 w-full">
        <!--insert empty space-->
        <div class="h-screen"></div>
    </div>
    

    <div class="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-blue-200 to-sky-200 font-inter antialiased">
        <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
            <div class="text-center">
                <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-slate-800">Want to go to anywhere in 
                    <span class="text-indigo-500 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                        <ul class="block animate-text-slide text-left leading-tight [&_li]:block">
                            <li>Asia<span class="text-black">?</span></li>
                            <li>Africa <span class="text-black">?</span></li>
                            <li>America <span class="text-black">?</span></li>
                            <li>Europe <span class="text-black">?</span></li>
                            <li>Oceania <span class="text-black">?</span></li>
                            <li aria-hidden="true">Asia</li>
                        </ul>
                    </span>
                </div>
                <div class="text-xl mt-10">
                    Let us help you with that.
                </div>
            </div>
        </div>
    </div>
    

    <div class="flex items-center justify-center bg-sky-200 pt-10">
    <h2 class="text-center">What we have to offer</h2>
    </div>
    <div class="flex items-center px-56 py-10 h-5/6 justify-center bg-gradient-to-b from-sky-200 to-blue-200">
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="PlanningJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center not-italic">Itinerary Generator</h3>
                <p class=" h5 text-center mx-10 ">No need to think about where to go again. We done all of that for you.</p>
            </div>
            
        </div>
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="MoneyJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center not-italic">Billbuddy</h3>
                <p class=" h5 text-center mx-10 ">Who owes who will never be a worry again. Let us take care of that for you.</p>
            </div>
            
        </div>
        <div class="col-sm-6 col-lg-4">
            <Vue3Lottie :animationData="ToolsJSON" :height="200" :width="300" />
            <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 text-center not-italic">Tools</h3>
                <p class=" h5 text-center mx-10">With our currency converter and translator, you will never feel lost again.</p>
            </div>
            
        </div>
    </div>
        
    <div class="flex items-center mx-auto h-screen justify-center bg-gradient-to-b from-blue-200 to-sky-200">
        <div class="col-lg-12">
            <h2 class="mb-3 text-center">What our Travelers have to say</h2>
            <testimonials></testimonials>
        </div>
    </div>

    <div class="flex items-center h-screen justify-center bg-gradient-to-b from-sky-200 to-base-100">
        <div class="col-lg-12 items-center justify-center py-96">
            <div class="my-10">
                <Vue3Lottie :animationData="EndingJSON" :height="500" :width="1500" />
            </div>
            <h2 class="mb-5 text-center">Ready to Supercharge Your Travel Planning?</h2>
            <div class="flex items-center justify-center">
                <router-link to="/sign-up"><button class="inline-flex items-center h-12 px-6 text-lg text-white transition-colors duration-150 bg-blue-400 rounded-full focus:shadow-outline hover:bg-blue-500 ">
                    <svg class="w-4 h-4 mr-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    <span>Lets Go!</span></button></router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import testimonials from '../../components/testimonials.vue'
import LottieJSON from '../../assets/lottie/Lottie.json'
import MoneyJSON from '../../assets/lottie/money.json'
import PlanningJSON from '../../assets/lottie/planning.json'
import ToolsJSON from '../../assets/lottie/tools.json'
import EndingJSON from '../../assets/lottie/ending.json'

export default {
  components: {
    Vue3Lottie,
    testimonials,

  },
  data() {
    return {
      LottieJSON,
      MoneyJSON,
      PlanningJSON,
      ToolsJSON,
      EndingJSON,
    }
  },
}
</script>

<style scoped>
</style>