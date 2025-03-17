<template>
    <a-card>
        <template #title>
            <a-typography-title :level="4">Выберите пользователя</a-typography-title>
        </template>
        <a-list v-if="data" item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
            <a-list-item>
                <a-list-item-meta>
                <template #title>
                    {{ item.fullName }}
                </template>
                <template #avatar>
                    <a-avatar :src="item.avatar" />
                </template>
                
                </a-list-item-meta>
                <template #actions>
                    <a-button @click="login(item.username)">Вход</a-button>
                </template>
            </a-list-item>
            </template>
        </a-list>
    </a-card>
</template>

<script setup lang="ts">
import { useApiFetch } from '~/utils/api';

const router = useRouter();
const data = await useApiFetch<any[]>('/users')

const login = async (username: string) => {
 const data = await useApiFetch<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: {
        username,
        password: "dev"
    }
 })

 if (data?.access_token) {
    const token = useCookie('auth_token');
    token.value = data.access_token;
    router.push('/')
 }
}
</script>
