<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);
</script>

<template>
  <section id="skills" class="skills">
    <div class="container">
      <h2 class="section-heading">Skills & Expertise</h2>

      <div class="skills-grid">
        <div
          v-for="(skill, index) in data?.skills"
          :key="skill.name"
          class="skill-card glass-card"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 300, delay: index * 50 } }"
        >
          <h3>{{ skill.name }}</h3>
          <div v-if="skill.experience" class="experience-bar">
            <div class="experience-progress"></div>
            <span>{{ skill.experience }}</span>
          </div>
          <ul class="skill-list">
            <li v-for="subSkill in skill.subSkills" :key="subSkill">{{ subSkill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.skill-card {
  padding: var(--space-4);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;

  &:hover {
    .experience-progress {
      width: 100%;
    }
  }

  h3 {
    margin-top: var(--space-3);
    margin-bottom: var(--space-2);
    font-size: var(--font-size-xl);
  }
}

.skill-icon {
  width: 48px;
  height: 48px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--aether-primary), var(--aether-secondary));
  border-radius: var(--border-radius);
  margin-bottom: var(--space-3);

  svg {
    color: white;
  }
}

.experience-bar {
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-full);
  margin-bottom: var(--space-3);
  position: relative;

  .experience-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, var(--aether-primary-light), var(--aether-accent-light));
    border-radius: var(--border-radius-full);
    width: 0;
    transition: width 1.5s ease;
  }

  span {
    position: absolute;
    top: -25px;
    right: 0;
    font-size: var(--font-size-sm);
    color: var(--aether-text-secondary);
  }
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: var(--space-1) 0;
    color: var(--aether-text-secondary);
    position: relative;
    padding-left: var(--space-3);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background-color: var(--aether-accent);
      border-radius: 50%;
    }
  }
}

.technologies {
  text-align: center;
  margin-top: var(--space-6);

  h3 {
    margin-bottom: var(--space-4);
    font-size: var(--font-size-xl);
  }
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: center;
}

.tech-tag {
  padding: var(--space-1) var(--space-3);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  color: var(--aether-text-secondary);
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(59, 75, 204, 0.2);
    border-color: var(--aether-primary-light);
    transform: translateY(-3px);
  }
}
</style>
