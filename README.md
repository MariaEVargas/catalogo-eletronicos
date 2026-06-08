# Catálogo de Eletrônicos

App mobile de catálogo de produtos eletrônicos desenvolvido com React Native e Expo.

## Telas

### Cadastro
Formulário de criação de conta com os campos nome, e-mail, senha e telefone. Os campos obrigatórios são validados em tempo real com mensagens de erro inline. Ao concluir o cadastro, o usuário é redirecionado para o Catálogo.

### Catálogo
Lista todos os produtos disponíveis consumidos via API. Possui filtro por categoria (Smartphones, Notebooks, Acessórios) usando um seletor nativo. Cada card exibe imagem, nome, categoria e preço. Ao tocar em um produto, o usuário é levado para a tela de Detalhes.

### Detalhes
Exibe as informações completas do produto: imagem em destaque, categoria, nome, preço e descrição. Permite adicionar o produto aos favoritos. Inclui botão de voltar no cabeçalho que retorna à tela de origem (Catálogo ou Favoritos).

### Favoritos
Lista os produtos salvos pelo usuário durante a sessão. Permite remover itens individualmente. Quando vazia, exibe um botão de atalho para o Catálogo.

### Dashboard
Painel com estatísticas gerais: total de produtos cadastrados, total de favoritos e distribuição de produtos por categoria em um gráfico de pizza.

## Stack

- [Expo](https://expo.dev) (SDK 54)
- [React Navigation](https://reactnavigation.org) — Drawer Navigator customizado
- [React Hook Form](https://react-hook-form.com) — formulário de cadastro
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) — gráfico no dashboard
- [MockAPI](https://mockapi.io) — API REST para produtos e usuários

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org)
- [Expo Go](https://expo.dev/go) instalado no celular

### Instalação

```bash
npm install --legacy-peer-deps
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS).

## Estrutura

```
src/
├── components/       # Componentes reutilizáveis
├── contexts/         # Contextos (User, Product, Favorites)
├── navigation/       # Drawer Navigator
├── screens/          # Telas do app
├── services/         # Integração com a API
└── theme.js          # Paleta de cores
```
