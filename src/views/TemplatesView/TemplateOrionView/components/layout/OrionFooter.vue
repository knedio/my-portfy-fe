<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} orion Portfolio. All rights reserved.</p>
        <div class="social-links">
          <a href="#" aria-label="GitHub">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
              ></path>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: var(--space-5) 0;
  background-color: rgba(10, 15, 30, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--space-3);
    text-align: center;
  }

  p {
    margin: 0;
    color: var(--orion-text-secondary);
  }
}

.social-links {
  display: flex;
  gap: var(--space-3);

  a {
    color: var(--orion-text-secondary);
    transition:
      color var(--transition-fast),
      transform var(--transition-fast);

    &:hover {
      color: var(--orion-accent-light);
      transform: translateY(-3px);
    }
  }
}
</style>
