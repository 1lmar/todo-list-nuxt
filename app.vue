<template>
  <div v-if="isLoading" class="spinner">
    <div class="spinner-circle"></div>
  </div>
  <div class="todo-app">
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import 'ant-design-vue/dist/reset.css';

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})
</script>

<style>
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255); /* Полупрозрачный фон */
  z-index: 9999; /* Чтобы спиннер был поверх всего контента */
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-circle {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.todo-app {
  max-width: 600px;
  margin: 50px auto;
}
</style>
