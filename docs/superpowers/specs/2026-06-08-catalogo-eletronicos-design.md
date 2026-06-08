# Design Spec — Catálogo de Eletrônicos

**Data:** 2026-06-08
**Projeto:** Trabalho acadêmico — App React Native/Expo
**Contexto:** App de catálogo de eletrônicos com cadastro de usuário e lista de favoritos

---

## 1. Visão Geral

App mobile de catálogo de produtos eletrônicos. O usuário se cadastra, navega pelo catálogo, filtra por categoria, adiciona produtos aos favoritos e visualiza um dashboard com métricas do catálogo.

**Stack:**
- React Native com Expo (Snack: https://snack.expo.dev)
- Navegação: React Navigation — Drawer Navigator customizado
- Estado global: Context API (3 contexts separados)
- Formulário: React Hook Form
- Gráficos: `react-native-chart-kit`
- API: MockAPI (GET e POST)

---

## 2. Telas

### Tela 1 — Cadastro de Usuário (obrigatória)
- **Campos:** Nome completo, E-mail, Senha, Telefone (opcional)
- **Validações:**
  - Nome: obrigatório
  - E-mail: obrigatório, formato válido (regex)
  - Senha: obrigatório, mínimo 6 caracteres
  - Telefone: opcional
- **Ação:** POST em `/users` no MockAPI → navega para o Catálogo
- **Lib de formulário:** React Hook Form

### Tela 2 — Catálogo de Produtos
- GET em `/products` no MockAPI ao montar a tela
- RNPicker para filtrar por categoria: Smartphones, Notebooks, Acessórios, Todos
- FlatList exibindo cards com imagem, nome e preço
- Toque no card navega para Detalhes do Produto

### Tela 3 — Detalhes do Produto
- Recebe o produto via parâmetro de navegação (`route.params`)
- Desestruturação: `const { produto } = route.params`
- Exibe: imagem grande, nome, descrição, preço, categoria
- Botão "Adicionar aos Favoritos" — salva no FavoritesContext

### Tela 4 — Favoritos
- Lista os produtos favoritados com FlatList
- Botão de remover em cada item
- Estado gerenciado pelo FavoritesContext (em memória)

### Tela 5 — Dashboard
- Gráfico de pizza: distribuição de produtos por categoria
- Cards de destaque: produto mais caro, produto mais barato, total de itens no catálogo
- Dados lidos do ProductContext (sem nova chamada à API)

---

## 3. Estrutura de Dados (MockAPI)

### Coleção `/users`
```json
{
  "id": "1",
  "nome": "Maria Eduarda",
  "email": "maria@email.com",
  "senha": "123456",
  "telefone": "27999999999"
}
```

### Coleção `/products`
```json
{
  "id": "1",
  "nome": "iPhone 15",
  "descricao": "Smartphone Apple 128GB",
  "preco": 4999.99,
  "categoria": "Smartphones",
  "imagem": "https://url-da-imagem.com/iphone.jpg"
}
```

### Operações de API
| Tela | Método | Endpoint |
|---|---|---|
| Cadastro | POST | `/users` |
| Catálogo | GET | `/products` |

---

## 4. Arquitetura de Estado (Contexts)

| Context | Responsabilidade |
|---|---|
| `UserContext` | Dados do usuário cadastrado/logado |
| `ProductContext` | Lista de produtos buscada do MockAPI |
| `FavoritesContext` | Lista de produtos favoritados pelo usuário |

---

## 5. Navegação

**Drawer Navigator customizado** com os itens:
- Cadastro
- Catálogo
- Favoritos
- Dashboard

> A tela de Detalhes não aparece no Drawer — é acessada apenas via toque no card do Catálogo.

**Passagem de parâmetros:**
- Catálogo → Detalhes: `navigation.navigate('Detalhes', { produto })`
- Detalhes consome: `const { produto } = route.params`

---

## 6. Estrutura de Pastas

```
src/
├── contexts/
│   ├── UserContext.js
│   ├── ProductContext.js
│   └── FavoritesContext.js
├── screens/
│   ├── Cadastro/
│   ├── Catalogo/
│   ├── Detalhes/
│   ├── Favoritos/
│   └── Dashboard/
├── components/
│   ├── ProductCard/
│   │   ├── index.js
│   │   └── styles.js
│   ├── FavoriteCard/
│   │   ├── index.js
│   │   └── styles.js
│   └── DashboardCard/
│       ├── index.js
│       └── styles.js
└── services/
    └── api.js
```

---

## 7. Componentização

| Componente | Usado em | Responsabilidade |
|---|---|---|
| `ProductCard` | Catálogo | Exibe imagem, nome e preço do produto |
| `FavoriteCard` | Favoritos | Exibe produto favoritado com botão de remover |
| `DashboardCard` | Dashboard | Exibe métrica individual (mais caro, mais barato, total) |

---

## 8. Requisitos Técnicos Atendidos

| Requisito | Solução |
|---|---|
| Cadastro com validação | React Hook Form + validações no campo |
| Drawer Navigator customizado | React Navigation Drawer |
| useContext / createContext | 3 contexts: User, Product, Favorites |
| Desestruturação (direta e indireta) | `route.params`, props dos componentes |
| FlatList + RNPicker (filtro) | Tela de Catálogo |
| API REST (GET e POST) | MockAPI: GET /products, POST /users |
| Componentização com index.js e styles.js | ProductCard, FavoriteCard, DashboardCard |
