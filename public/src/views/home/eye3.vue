<template>
    <div class="canvas-container">
      <canvas id="canvas3d" :class="{ scrollable: isAnimationFinished && hasScrolledEnough }"></canvas>
    </div>
  </template>
  

<script>
import { Application } from '@splinetool/runtime';
export default {
  data() {
    return {
      isLoading: true,
      isAnimationFinished: false,
      hasScrolledEnough: false, // Initially set to false
      scrollListener: null, // To store the scroll event listener
    };
  },
  methods: {
    initSplineApplication() {
      const canvas = document.getElementById('canvas3d');
      const app = new Application(canvas);

      // Load your Spline scene
      app.load('https://prod.spline.design/EVvnI4ejWwuXbARA/scene.splinecode')
        .then(() => {
          // Animation is finished loading
          this.isLoading = false;
          this.isAnimationFinished = true;
          this.addScrollListener(); // Add the scroll listener when the animation is finished
        });
    },
    addScrollListener() {
      this.scrollListener = () => {
        // Check if the user has scrolled a certain distance (e.g., 100 pixels)
        if (window.scrollY >= 400) {
          // User has scrolled enough, remove the scroll listener
          this.hasScrolledEnough = true;
          window.removeEventListener('scroll', this.scrollListener);
        }
      };
      window.addEventListener('scroll', this.scrollListener);
    },
  },
  mounted() {
    this.initSplineApplication();
  },
};


</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* Set the desired background color */
  /* You can adjust other styles for the canvas container as needed */
}

canvas#canvas3d {
  /* Common styles when the animation is loading */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  visibility: visible;
  z-index: 1;

  /* Additional styles when both animation is finished and user has scrolled enough */
  &.scrollable {
    position: absolute;
    /* Add any other styles for the canvas as needed */
  }
}

.loading-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  /* Add styles for the loading animation */
}
</style>
