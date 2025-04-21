<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { ref } from 'vue';

const hero = ref(null);
const features = ref(null);
const cta = ref(null);

useMotion(hero, {
  initial: { opacity: 0, y: 100 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 800 },
  },
});

useMotion(features, {
  initial: { opacity: 0, x: -100 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 800, delay: 200 },
  },
});

useMotion(cta, {
  initial: { opacity: 0, scale: 0.8 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 600, delay: 400 },
  },
});
</script>

<template>
  <div class="">
    <div ref="hero" class="container mx-auto px-4 py-20">
      <div class="text-center">
        <h1
          class="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Create Your Dream Portfolio
        </h1>
        <p class="text-xl text-gray-300 mb-8">
          Build, customize, and showcase your work with our powerful portfolio platform
        </p>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300"
        >
          Get Started Free
        </button>
      </div>
    </div>

    <div ref="features" class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-gray-800 p-6 rounded-lg hover:transform hover:scale-105 transition duration-300"
        >
          <div class="text-blue-400 text-4xl mb-4">✨</div>
          <h3 class="text-xl font-bold mb-2">Custom Templates</h3>
          <p class="text-gray-400">
            Choose from a variety of professional templates to showcase your work
          </p>
        </div>
        <div
          class="bg-gray-800 p-6 rounded-lg hover:transform hover:scale-105 transition duration-300"
        >
          <div class="text-purple-400 text-4xl mb-4">🎨</div>
          <h3 class="text-xl font-bold mb-2">Easy Customization</h3>
          <p class="text-gray-400">Modify colors, layouts, and content with our intuitive editor</p>
        </div>
        <div
          class="bg-gray-800 p-6 rounded-lg hover:transform hover:scale-105 transition duration-300"
        >
          <div class="text-green-400 text-4xl mb-4">📱</div>
          <h3 class="text-xl font-bold mb-2">Responsive Design</h3>
          <p class="text-gray-400">Your portfolio looks great on all devices, automatically</p>
        </div>
      </div>
    </div>

    <div ref="cta" class="container mx-auto px-4 py-16">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
        <h2 class="text-4xl font-bold mb-4">Ready to Showcase Your Work?</h2>
        <p class="text-xl mb-8">Join thousands of professionals who trust our platform</p>
        <div class="space-x-4">
          <button
            class="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Start Building
          </button>
          <button
            class="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
          >
            View Examples
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
