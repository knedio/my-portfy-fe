<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/stores/portfolio';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

// const developmentSkills: Skill[] = [
//   { name: 'HTML/CSS', percentage: 95, color: '#bd93f9' },
//   { name: 'JavaScript', percentage: 85, color: '#ff79c6' },
//   { name: 'Vue.js', percentage: 90, color: '#8be9fd' },
//   { name: 'TypeScript', percentage: 80, color: '#bd93f9' },
// ];

const skillsSection = ref(null);
useMotion(skillsSection, {
  initial: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 800,
    },
  },
});
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="section-title">
        <h2>My Skills</h2>
        <div class="title-underline"></div>
      </div>

      <div ref="skillsSection" class="skills-content">
        <div
          v-for="skill in data?.skills"
          :key="skill.name"
          class="skills-card design-skills relative"
        >
          <h3 class="">
            {{ skill.name }}
          </h3>
          <span class="text-gray-400 text-sm absolute right-5 bottom-5">{{
            skill.experience
          }}</span>

          <ul class="flex flex-wrap gap-2 justify-center mt-3">
            <li
              v-for="subSkill in skill.subSkills"
              :key="subSkill"
              class="bg-gray-700 text-sm text-white px-3 py-1 rounded-full"
            >
              {{ subSkill }}
            </li>
          </ul>
          <!-- <div class="skills-list">
            <div v-for="(skill, index) in designSkills" :key="`design-${index}`" class="skill-item">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percentage">{{ skill.percentage }}%</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="{
                    width: `${skill.percentage}%`,
                    background: `linear-gradient(to right, ${skill.color}, ${skill.color}dd)`,
                  }"
                ></div>
              </div>
            </div>
          </div> -->
        </div>

        <!-- <div class="skills-card development-skills">
          <h3>Development Skills</h3>

          <div class="skills-list">
            <div
              v-for="(skill, index) in developmentSkills"
              :key="`dev-${index}`"
              class="skill-item"
            >
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-percentage">{{ skill.percentage }}%</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-progress"
                  :style="{
                    width: `${skill.percentage}%`,
                    background: `linear-gradient(to right, ${skill.color}, ${skill.color}dd)`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div class="other-skills">
        <h3>Other Skills</h3>
        <div class="tags">
          <span class="tag">Responsive Design</span>
          <span class="tag">SCSS/SASS</span>
          <span class="tag">Git</span>
          <span class="tag">Node.js</span>
          <span class="tag">REST API</span>
          <span class="tag">SEO</span>
          <span class="tag">WordPress</span>
          <span class="tag">Accessibility</span>
        </div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #261639 0%, #301b48 100%);
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

.skills-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.skills-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.skills-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.skills-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.skills-card h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  border-radius: 2px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  width: 100%;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.skill-percentage {
  color: rgba(255, 255, 255, 0.7);
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s ease-in-out;
}

.other-skills {
  text-align: center;
  margin-top: 4rem;
}

.other-skills h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.tag {
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tag:hover {
  background: rgba(255, 121, 198, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 121, 198, 0.3);
  border-color: rgba(255, 121, 198, 0.3);
}

@media (max-width: 992px) {
  .skills-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }

  .skills-card h3 {
    font-size: 1.3rem;
  }

  .tag {
    font-size: 0.8rem;
    padding: 0.4rem 1.2rem;
  }
}
</style>
