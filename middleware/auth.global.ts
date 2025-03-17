export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('auth_token'); // Получаем токен из cookies
  
    if (!token.value) {
      if (to.name !== 'login') {
        return navigateTo('/login'); // Перенаправляем на страницу входа, если токена нет
      }
    } else {

      if (to.name === 'login') {
        return navigateTo('/');
      }
    }
  });