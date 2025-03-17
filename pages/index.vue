<template>
    <a-card>
      <template #title>
        <div style="display: flex;padding-top: 4px;">
          <a-card-meta v-if="user">
            <template #title>
                {{ user.fullName }}
            </template>
            <template #avatar>
                <a-avatar :src="user.avatar" />
            </template>
          </a-card-meta>
        <a-button style="margin-left: auto;" @click="logout">Выход</a-button>
      </div>
      </template>
      <h1>Список задач</h1>
  
      <!-- Добавление задачи -->
      <div style="display: flex;">
        <a-input
          v-model:value="newTask"
          placeholder="Введите новую задачу"
          style="margin-right: 10px"
        />
        <a-button type="primary" @click="addTask">Добавить</a-button>
      </div>
  
      <!-- Список задач -->
      <a-spin v-if="isLoading" :spinning="isLoading" />
      <a-list
        v-if="tasks.length > 0"
        :data-source="tasks"
        style="margin-top: 20px"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-checkbox v-model:checked="item.completed" @change="toggleTask(item.id)">{{ item.title }}</a-checkbox>
            <a-button type="link" danger @click="removeTask(item.id)">Удалить</a-button>
          </a-list-item>
        </template>
      </a-list>
      <p v-else-if="!isLoading">Нет задач</p>
    </a-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'

  const router = useRouter();

  const user = await useApiFetch('/auth/profile')
  
  const tasks = ref<any[]>([])
  const isLoading = ref(false)

  const loadTasks = async () => {
    isLoading.value = true
     const res = await useApiFetch<any[]>('/todos')
     if (res?.length) {
      tasks.value = res
     }
     isLoading.value = false
  }
  loadTasks();
  
  // Новая задача
  const newTask = ref('')
  
  // Добавление задачи
  async function addTask() {
    if (!newTask.value.trim()) {
      alert('Введите текст задачи')
      return
    }

    try {
      const res = await useApiFetch('/todos', {
        method: 'POST',
        body: {
          title: newTask.value
        },
      })

      newTask.value = ''
      tasks.value.push(res)
    } catch {}
  }

  const toggleTask = async (id: number) => {
    const res = await useApiFetch<{ completed: boolean }>(`/todos/${id}/toggle`, {
      method: 'PATCH',
    })

    const task = tasks.value.find((item) => item.id === id);
    task.completed = res.completed
  }

  async function removeTask(taskId: number) {
    try {
    await useApiFetch<{ completed: boolean }>(`/todos/${taskId}`, {
      method: 'DELETE',
    })
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    } catch {}
  }

  const logout = () => {
    const token = useCookie('auth_token');
    token.value = undefined;
    router.push('/login')
  }
  </script>
