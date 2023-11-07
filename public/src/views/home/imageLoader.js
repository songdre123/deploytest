// imageLoader.js
export function loadImage(index) {
    return import(`@/assets/eye/${String(index).padStart(3, '0')}.jpg`);
  }
  