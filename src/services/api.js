const BASE_URL = 'https://SUA_BASE_URL.mockapi.io';

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
};

export const postUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Erro ao cadastrar usuário');
  return response.json();
};
