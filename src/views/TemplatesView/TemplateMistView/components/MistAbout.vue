<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const aboutImage = ref(null);
const aboutContent = ref(null);

useMotion(aboutImage, {
  initial: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 800,
    },
  },
});

useMotion(aboutContent, {
  initial: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 800,
      delay: 200,
    },
  },
});
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-title">
        <h2>About Me</h2>
        <div class="title-underline"></div>
      </div>

      <div class="about-content">
        <div ref="aboutImage" class="about-image">
          <img
            src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Designer & Developer"
          />
          <div class="image-shape"></div>
        </div>

        <div ref="aboutContent" class="about-text">
          <h3>
            Hi there, I'm
            <span class="name-highlight">{{ `${data?.firstName} ${data?.lastName}` }}</span>
          </h3>

          <div class="about-intro" v-html="data?.about.description"></div>

          <div class="personal-info">
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">
                <a :href="`mailto:${data?.contactEmail}`">{{ data?.contactEmail }}</a>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Location:</span>
              <span class="info-value">
                <p>{{ data?.location }}</p>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Mobile No.:</span>
              <span class="info-value">
                <a :href="`tel:${data?.mobileNumber}`">{{ data?.mobileNumber }}</a>
              </span>
            </div>
          </div>

          <div class="about-cta">
            <a href="#contact" class="cta-button">Let's Talk</a>
            <a href="#" class="resume-link">Download Resume</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #190f23 0%, #261639 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-underline {
  height: 4px;
  width: 70px;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  margin: 0 auto;
  border-radius: 2px;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  position: relative;
}

.about-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.image-shape {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 20px;
  left: 20px;
  background: linear-gradient(to right bottom, #ff79c6, #bd93f9);
  border-radius: 10px;
  z-index: 1;
}

.about-text h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.name-highlight {
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.about-intro {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.about-details p {
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}

.personal-info {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.info-item {
  display: flex;
  margin-bottom: 0.8rem;
}

.info-label {
  width: 100px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.info-value {
  color: #fff;
}

.available {
  color: #50fa7b;
}

.about-cta {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(189, 147, 249, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.6);
}

.resume-link {
  display: inline-flex;
  align-items: center;
  color: #ff79c6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.8rem 1rem;
}

.resume-link:hover {
  color: #bd93f9;
}

@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-image {
    text-align: center;
  }

  .about-image img {
    max-width: 350px;
  }

  .image-shape {
    width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }

  .about-text h3 {
    font-size: 1.75rem;
  }

  .about-intro {
    font-size: 1.1rem;
  }
}
</style>
