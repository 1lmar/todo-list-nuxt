<template>
  <div class="todo-app">
    <h1>Todo List</h1>

    <!-- Добавление задачи -->
    <a-input
      v-model:value="newTask"
      placeholder="Введите новую задачу"
      style="width: 300px; margin-right: 10px"
    />
    <a-button type="primary" @click="addTask">Добавить</a-button>

    <!-- Список задач -->
    <a-list
      v-if="tasks.length > 0"
      :data-source="tasks"
      style="margin-top: 20px"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-checkbox v-model:checked="item.completed">{{ item.text }}</a-checkbox>
          <a-button type="link" danger @click="removeTask(item.id)">Удалить</a-button>
        </a-list-item>
      </template>
    </a-list>
    <p v-else>Нет задач</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Массив задач
const tasks = ref([])

// Новая задача
const newTask = ref('')

// Добавление задачи
function addTask() {
  if (!newTask.value.trim()) {
    alert('Введите текст задачи')
    return
  }

  tasks.value.push({
    id: Date.now(),
    text: newTask.value,
    completed: false
  })
  newTask.value = ''
}

// Удаление задачи
function removeTask(taskId) {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
}
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>