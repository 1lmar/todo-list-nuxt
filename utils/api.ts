export const useApiFetch = <T>(url: string, options: any = {}) => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.baseUrl;
  const token = useCookie('auth_token');

  const headers = {
    ...options.headers,
    Authorization: token.value ? `Bearer ${token.value}` : '',
    'Content-Type': 'application/json',
  };

  return $fetch<T>(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });
};