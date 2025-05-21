<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/stores/portfolio';
import { Project } from '@/models/portfolio.model';

const portfolioStore = usePortfolioStore();
const { data } = storeToRefs(portfolioStore);

const categories = computed(() => {
  const all = data.value?.projects?.filter((p) => !!p.category).map((p) => p.category) || [];
  const unique = Array.from(new Set(all));
  return ['All', ...unique];
});

const selectedCategory = ref('All');
const projectsSection = ref(null);

useMotion(projectsSection, {
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

const projects = computed(() => data.value?.projects ?? []);

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value;
  }
  return projects.value.filter((project) => project.category === selectedCategory.value);
});

const selectedProject = ref<Project | null>(null);

const openProject = (project: Project) => {
  selectedProject.value = project;
};

const closeProject = () => {
  selectedProject.value = null;
};
const onGetTechs = (value: Project) => {
  return value.tech ? value.tech.split(',') : [];
};
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <div class="section-title">
        <h2>My Projects</h2>
        <div class="title-underline"></div>
      </div>

      <div class="projects-filter">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
          class="filter-button"
        >
          {{ category }}
        </button>
      </div>

      <div ref="projectsSection" class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div>
                <span v-if="project.category" class="project-category">{{ project.category }}</span>
              </div>
              <div class="project-actions">
                <button class="view-project">View Project</button>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Project Modal -->
      <div class="project-modal" v-if="selectedProject" @click.self="closeProject">
        <div class="modal-content">
          <button class="close-modal" @click="closeProject">&times;</button>

          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>

          <div class="modal-details">
            <span v-if="selectedProject.category" class="modal-category">{{
              selectedProject.category
            }}</span>
            <h3 class="modal-title">{{ selectedProject.title }}</h3>
            <p class="modal-description">{{ selectedProject.description }}</p>

            <div class="modal-technologies">
              <h4>Technologies Used:</h4>
              <div class="tech-tags">
                <span v-for="tech in onGetTechs(selectedProject)" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>

            <a :href="selectedProject.link" class="view-live-button">View Live</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 6rem 0;
  background: linear-gradient(to bottom, #301b48 0%, #44244d 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
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

.projects-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-button {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button.active,
.filter-button:hover {
  background: linear-gradient(to right, rgba(255, 121, 198, 0.5), rgba(189, 147, 249, 0.5));
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.3);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.project-image {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 15, 35, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-category {
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  align-self: flex-start;
}

.project-actions {
  align-self: center;
}

.view-project {
  background: transparent;
  border: 2px solid #fff;
  padding: 0.8rem 1.5rem;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.view-project:hover {
  background: #fff;
  color: #301b48;
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.8rem;
}

.project-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal Styles */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 15, 35, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: rgba(48, 27, 72, 0.95);
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-image {
  width: 100%;
  height: 100%;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px 0 0 16px;
}

.modal-details {
  padding: 2.5rem 2rem 2.5rem 0;
}

.modal-category {
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1.5rem;
}

.modal-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.modal-technologies h4 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
}

.view-live-button {
  display: inline-block;
  padding: 0.8rem 2.5rem;
  background: linear-gradient(to right, #ff79c6, #bd93f9);
  color: #fff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(189, 147, 249, 0.3);
  text-align: center;
}

.view-live-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(189, 147, 249, 0.5);
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .modal-content {
    grid-template-columns: 1fr;
    max-width: 600px;
  }

  .modal-image img {
    border-radius: 16px 16px 0 0;
    max-height: 300px;
  }

  .modal-details {
    padding: 0 2rem 2rem;
  }
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .projects-filter {
    gap: 0.5rem;
  }

  .filter-button {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }

  .project-modal {
    padding: 1rem;
  }
}
</style>
