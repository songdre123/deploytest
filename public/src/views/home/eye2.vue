<template>
    <div>
      <canvas id="canvas3d"></canvas>
    </div>
  </template>

<script>
import { Application } from '@splinetool/runtime';
export default {
  mounted() {
    this.initSplineApplication();
  },
  methods: {
    initSplineApplication() {
      const canvas = document.getElementById('canvas3d'); // Assuming you have an element with id 'canvas3d' in your template
      const app = new Application(canvas);
      
      // Load your Spline scene
      app.load('https://prod.spline.design/EVvnI4ejWwuXbARA/scene.splinecode');
    },
  },
};

</script>