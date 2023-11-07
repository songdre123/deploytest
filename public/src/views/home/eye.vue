<template>
  <div>
    <div class="eye-container" :style="{ transform: 'translateY(' + scrollPosition + 'px)' }">
      <div class="eye-frame" :style="{ backgroundColor: frameBackgroundColor }">
        <img :src="frameUrls[index]" alt="Eye Frame" class="eye-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frames: [],
      frameUrls: [`../../assets/eye/001.png`],
      scrollPosition: 0,
      index: 0,
      frameBackgroundColor: 'transparent', // Initialize with a transparent background
    };
  },
  methods: {
    handleScroll() {
      const maxScrollPosition = (this.frames.length - 1) * 10;
      this.scrollPosition = Math.min(window.scrollY, maxScrollPosition);
      const index = Math.floor(this.scrollPosition / 10);
      if (index !== this.index) {
        this.index = index;
        this.frameUrls = this.frames.map((frame) => `src/assets/eye/${frame}.png`);
        this.updateFrameBackgroundColor(index); // Call the method to update background color
      }
    },
    updateFrameBackgroundColor(index) {
      // Set the background color based on the index
      if (index === this.frames.length - 1) {
        // If it's the last image, blend it into the page's background color (white)
        this.frameBackgroundColor = 'white';
      } else {
        // Otherwise, keep it transparent
        this.frameBackgroundColor = 'white';
      }
    },
  },
  created() {
    for (let i = 1; i <= 186; i++) {
      this.frames.push(String(i).padStart(3, "0"));
    }
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.eye-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  margin-top: 0;
}

.eye-scroll {
  display: flex;
  flex-direction: column;
}

.eye-frame {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-out, background-color 0.5s ease; /* Add transition for background-color */
}

.eye-image {
  max-width: 100%;
  width: auto;
  height: auto;
}
</style>
