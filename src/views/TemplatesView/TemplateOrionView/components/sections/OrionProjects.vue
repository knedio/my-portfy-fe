<script setup lang="ts">
import { Project } from '@/models/portfolio.model';
import { usePortfolioStore } from '@/stores/portfolio';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const onGetTechs = (value: Project) => {
  return value.tech ? value.tech.split(',') : [];
};
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-heading">Featured Projects</h2>

      <div class="projects-grid">
        <div
          v-for="(project, index) in data?.projects"
          :key="project.title"
          class="project-card"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 200 } }"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <a :href="project.link || '#'" class="view-project">View Project</a>
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in onGetTechs(project)" :key="tech" class="tech-pill">{{
                tech
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="view-all-projects">
        <a href="#" class="button">View All Projects</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-6);
}

.project-card {
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: var(--orion-bg-card);
  box-shadow: var(--shadow-md);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);

    .project-overlay {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }
  }
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 16, 31, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.view-project {
  padding: var(--space-2) var(--space-3);
  background: var(--orion-primary);
  color: white;
  border-radius: var(--border-radius);
  font-weight: var(--font-semibold);
  transition: background var(--transition-fast);

  &:hover {
    background: var(--orion-primary-light);
  }
}

.project-content {
  padding: var(--space-4);

  h3 {
    margin-bottom: var(--space-2);
    font-size: var(--font-size-xl);
  }

  p {
    color: var(--orion-text-secondary);
    margin-bottom: var(--space-3);
    font-size: var(--font-size-base);
  }
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-pill {
  font-size: var(--font-size-sm);
  padding: calc(var(--space-1) / 2) var(--space-2);
  background: rgba(59, 75, 204, 0.2);
  border-radius: var(--border-radius-full);
  color: var(--orion-text-secondary);
}

.view-all-projects {
  text-align: center;
  margin-top: var(--space-5);
}
</style>
