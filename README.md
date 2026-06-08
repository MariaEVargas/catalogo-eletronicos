# Catálogo de Eletrônicos

App mobile de catálogo de produtos eletrônicos desenvolvido com React Native e Expo.

## Funcionalidades

- **Cadastro** — criação de conta com validação de campos (React Hook Form)
- **Catálogo** — listagem de produtos com filtro por categoria
- **Detalhes** — informações completas do produto com opção de favoritar
- **Favoritos** — lista de produtos salvos pelo usuário
- **Dashboard** — visão geral com estatísticas e gráfico de distribuição por categoria

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
