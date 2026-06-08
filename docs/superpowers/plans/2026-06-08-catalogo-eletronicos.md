# Catálogo de Eletrônicos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar um app React Native/Expo de catálogo de eletrônicos com cadastro de usuário, catálogo filtrado por categoria, favoritos e dashboard de métricas.

**Architecture:** Context API com 3 providers independentes (User, Product, Favorites), Drawer Navigator customizado com 5 telas (Cadastro, Catálogo, Detalhes, Favoritos, Dashboard), dados de produtos e usuários persistidos via MockAPI (GET /products, POST /users), favoritos gerenciados em memória via FavoritesContext.

**Tech Stack:** React Native, Expo (Snack ou local), React Navigation 6 (Drawer), React Hook Form, @react-native-picker/picker, react-native-chart-kit, react-native-svg, MockAPI

---

## Mapa de Arquivos

```
catalogo-eletronicos/
├── App.js                              ← entry point: providers + NavigationContainer
├── package.json
└── src/
    ├── theme.js                        ← paleta de cores (COLORS)
    ├── services/
    │   └── api.js                      ← getProducts(), postUser()
    ├── contexts/
    │   ├── UserContext.js              ← UserProvider, useUser()
    │   ├── ProductContext.js           ← ProductProvider, useProducts()
    │   └── FavoritesContext.js         ← FavoritesProvider, useFavorites()
    ├── navigation/
    │   └── DrawerNavigator.js          ← Drawer + CustomDrawerContent
    ├── screens/
    │   ├── Cadastro/
    │   │   ├── index.js
    │   │   └── styles.js
    │   ├── Catalogo/
    │   │   ├── index.js
    │   │   └── styles.js
    │   ├── Detalhes/
    │   │   ├── index.js
    │   │   └── styles.js
    │   ├── Favoritos/
    │   │   ├── index.js
    │   │   └── styles.js
    │   └── Dashboard/
    │       ├── index.js
    │       └── styles.js
    └── components/
        ├── ProductCard/
        │   ├── index.js
        │   └── styles.js
        ├── FavoriteCard/
        │   ├── index.js
        │   └── styles.js
        └── DashboardCard/
            ├── index.js
            └── styles.js
```

---

## Task 1: Configurar MockAPI

**Files:**
- Nenhum arquivo a criar — configuração manual em mockapi.io

- [ ] **Step 1: Criar conta e projeto no MockAPI**

  Acesse https://mockapi.io e crie uma conta gratuita.
  Crie um novo projeto com o nome `catalogo-eletronicos`.
  Anote a BASE_URL gerada (formato: `https://XXXXXXXXXXXXXXXX.mockapi.io`).

- [ ] **Step 2: Criar recurso `/users`**

  Dentro do projeto, crie um novo recurso chamado `users`.
  Configure os campos:
  | Campo | Tipo |
  |---|---|
  | nome | String |
  | email | String |
  | senha | String |
  | telefone | String |

- [ ] **Step 3: Criar recurso `/products`**

  Crie um novo recurso chamado `products`.
  Configure os campos:
  | Campo | Tipo |
  |---|---|
  | nome | String |
  | descricao | String |
  | preco | Number |
  | categoria | String |
  | imagem | String |

- [ ] **Step 4: Popular `/products` com 9 produtos de exemplo**

  Usando a interface do MockAPI (botão "ADD"), insira os 9 produtos abaixo (3 por categoria):

  ```json
  [
    {
      "nome": "iPhone 15 Pro",
      "descricao": "Smartphone Apple com chip A17 Pro, 128GB, câmera tripla de 48MP",
      "preco": 7499.99,
      "categoria": "Smartphones",
      "imagem": "https://placehold.co/300x200/1565C0/white?text=iPhone+15+Pro"
    },
    {
      "nome": "Samsung Galaxy S24",
      "descricao": "Smartphone Samsung com tela Dynamic AMOLED 6.2 polegadas, 256GB",
      "preco": 4999.99,
      "categoria": "Smartphones",
      "imagem": "https://placehold.co/300x200/1565C0/white?text=Galaxy+S24"
    },
    {
      "nome": "Motorola Edge 40",
      "descricao": "Smartphone Motorola 5G, câmera principal de 50MP, 256GB",
      "preco": 2199.99,
      "categoria": "Smartphones",
      "imagem": "https://placehold.co/300x200/1565C0/white?text=Moto+Edge+40"
    },
    {
      "nome": "MacBook Air M2",
      "descricao": "Notebook Apple com chip M2, 8GB RAM, 256GB SSD, tela Liquid Retina",
      "preco": 9999.99,
      "categoria": "Notebooks",
      "imagem": "https://placehold.co/300x200/FF6F00/white?text=MacBook+Air+M2"
    },
    {
      "nome": "Dell XPS 13",
      "descricao": "Notebook Dell ultrafino, Intel Core i7 12ª geração, 16GB, 512GB SSD",
      "preco": 7299.99,
      "categoria": "Notebooks",
      "imagem": "https://placehold.co/300x200/FF6F00/white?text=Dell+XPS+13"
    },
    {
      "nome": "Lenovo IdeaPad 3",
      "descricao": "Notebook Lenovo, AMD Ryzen 5, 8GB RAM, 256GB SSD",
      "preco": 2999.99,
      "categoria": "Notebooks",
      "imagem": "https://placehold.co/300x200/FF6F00/white?text=Lenovo+IdeaPad"
    },
    {
      "nome": "AirPods Pro 2",
      "descricao": "Fones de ouvido Bluetooth Apple com cancelamento de ruído ativo",
      "preco": 1699.99,
      "categoria": "Acessórios",
      "imagem": "https://placehold.co/300x200/2E7D32/white?text=AirPods+Pro+2"
    },
    {
      "nome": "Teclado Redragon K552",
      "descricao": "Teclado mecânico gamer com retroiluminação RGB e switches Red",
      "preco": 299.99,
      "categoria": "Acessórios",
      "imagem": "https://placehold.co/300x200/2E7D32/white?text=Teclado+K552"
    },
    {
      "nome": "Mouse Logitech MX Master 3",
      "descricao": "Mouse sem fio premium com 7 botões programáveis e sensor de 4000 DPI",
      "preco": 499.99,
      "categoria": "Acessórios",
      "imagem": "https://placehold.co/300x200/2E7D32/white?text=MX+Master+3"
    }
  ]
  ```

- [ ] **Step 5: Verificar o endpoint GET**

  No navegador, acesse `https://SEU_ID.mockapi.io/products`.
  Resultado esperado: array JSON com os 9 produtos cadastrados.

---

## Task 2: Inicializar projeto e instalar dependências

**Files:**
- Create: `package.json` (Snack gerencia automaticamente; para local: criado pelo `create-expo-app`)

- [ ] **Step 1: Criar o projeto**

  **Opção A — Expo Snack (online):**
  1. Acesse https://snack.expo.dev
  2. Clique em "New Snack"
  3. Renomeie o projeto para `catalogo-eletronicos`

  **Opção B — Local:**
  ```bash
  npx create-expo-app catalogo-eletronicos
  cd catalogo-eletronicos
  ```

- [ ] **Step 2: Instalar dependências**

  **Expo Snack:** clique no ícone de pacotes (painel esquerdo) e adicione um a um:
  - `@react-navigation/native`
  - `@react-navigation/drawer`
  - `react-native-gesture-handler`
  - `react-native-reanimated`
  - `@react-native-picker/picker`
  - `react-hook-form`
  - `react-native-chart-kit`
  - `react-native-svg`

  **Local:**
  ```bash
  npx expo install @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated @react-native-picker/picker react-hook-form react-native-chart-kit react-native-svg
  ```

- [ ] **Step 3: Criar estrutura de pastas**

  ```bash
  mkdir -p src/services src/contexts src/navigation
  mkdir -p src/screens/Cadastro src/screens/Catalogo src/screens/Detalhes
  mkdir -p src/screens/Favoritos src/screens/Dashboard
  mkdir -p src/components/ProductCard src/components/FavoriteCard src/components/DashboardCard
  ```

---

## Task 3: Paleta de cores e serviço de API

**Files:**
- Create: `src/theme.js`
- Create: `src/services/api.js`

- [ ] **Step 1: Criar `src/theme.js`**

  ```javascript
  export const COLORS = {
    primary: '#1565C0',
    primaryDark: '#0D47A1',
    accent: '#FF6F00',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212121',
    textLight: '#757575',
    error: '#C62828',
    success: '#2E7D32',
    white: '#FFFFFF',
    border: '#E0E0E0',
  };
  ```

- [ ] **Step 2: Criar `src/services/api.js`**

  Substitua `SUA_BASE_URL` pela URL gerada no MockAPI (Task 1, Step 1).

  ```javascript
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
  ```

- [ ] **Step 3: Verificar**

  Abra o Snack no celular ou emulador. Nenhuma tela ainda — apenas verificar que não há erros de importação.

---

## Task 4: Implementar os 3 Contexts

**Files:**
- Create: `src/contexts/UserContext.js`
- Create: `src/contexts/ProductContext.js`
- Create: `src/contexts/FavoritesContext.js`

- [ ] **Step 1: Criar `src/contexts/UserContext.js`**

  ```javascript
  import React, { createContext, useContext, useState } from 'react';

  const UserContext = createContext(null);

  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

  export const useUser = () => useContext(UserContext);
  ```

- [ ] **Step 2: Criar `src/contexts/ProductContext.js`**

  ```javascript
  import React, { createContext, useContext, useState, useEffect } from 'react';
  import { getProducts } from '../services/api';

  const ProductContext = createContext(null);

  export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    return (
      <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
        {children}
      </ProductContext.Provider>
    );
  };

  export const useProducts = () => useContext(ProductContext);
  ```

- [ ] **Step 3: Criar `src/contexts/FavoritesContext.js`**

  ```javascript
  import React, { createContext, useContext, useState } from 'react';

  const FavoritesContext = createContext(null);

  export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (product) => {
      setFavorites((prev) => {
        if (prev.find((p) => p.id === product.id)) return prev;
        return [...prev, product];
      });
    };

    const removeFavorite = (productId) => {
      setFavorites((prev) => prev.filter((p) => p.id !== productId));
    };

    const isFavorite = (productId) => favorites.some((p) => p.id === productId);

    return (
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
        {children}
      </FavoritesContext.Provider>
    );
  };

  export const useFavorites = () => useContext(FavoritesContext);
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add src/
  git commit -m "feat: adiciona theme, api service e os 3 contexts"
  ```

---

## Task 5: DrawerNavigator e App.js

**Files:**
- Create: `src/navigation/DrawerNavigator.js`
- Modify: `App.js`

- [ ] **Step 1: Criar `src/navigation/DrawerNavigator.js`**

  Por enquanto, importa placeholders de telas (serão criadas nas próximas tasks). Crie arquivos de tela temporários se necessário (cada tela retorna um `<View>` vazio).

  ```javascript
  import React from 'react';
  import { View, Text, StyleSheet } from 'react-native';
  import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

  import CadastroScreen from '../screens/Cadastro';
  import CatalogoScreen from '../screens/Catalogo';
  import FavoritosScreen from '../screens/Favoritos';
  import DashboardScreen from '../screens/Dashboard';
  import DetalhesScreen from '../screens/Detalhes';
  import { COLORS } from '../theme';

  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>⚡ ElectroShop</Text>
        <Text style={styles.drawerSubtitle}>Catálogo de Eletrônicos</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );

  export const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: COLORS.accent,
        drawerInactiveTintColor: '#B0BEC5',
        drawerStyle: { backgroundColor: COLORS.primaryDark },
        drawerLabelStyle: { color: COLORS.white, fontSize: 15, fontWeight: '500' },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Cadastro" component={CadastroScreen} options={{ title: '👤 Cadastro' }} />
      <Drawer.Screen name="Catálogo" component={CatalogoScreen} options={{ title: '🛒 Catálogo' }} />
      <Drawer.Screen name="Favoritos" component={FavoritosScreen} options={{ title: '★ Favoritos' }} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ title: '📊 Dashboard' }} />
      <Drawer.Screen
        name="Detalhes"
        component={DetalhesScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Detalhes' }}
      />
    </Drawer.Navigator>
  );

  const styles = StyleSheet.create({
    drawerContainer: { flex: 1 },
    drawerHeader: {
      padding: 20,
      paddingTop: 40,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.2)',
      marginBottom: 8,
    },
    drawerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
    drawerSubtitle: { fontSize: 13, color: '#B0BEC5', marginTop: 4 },
  });
  ```

- [ ] **Step 2: Criar telas placeholder para não quebrar os imports**

  Crie `src/screens/Cadastro/index.js`, `src/screens/Catalogo/index.js`, `src/screens/Detalhes/index.js`, `src/screens/Favoritos/index.js` e `src/screens/Dashboard/index.js` — cada um com o conteúdo abaixo (substitua "NomeDaTela" pelo nome correto):

  ```javascript
  import React from 'react';
  import { View, Text } from 'react-native';

  export default function NomeDaTela() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>NomeDaTela</Text>
      </View>
    );
  }
  ```

- [ ] **Step 3: Substituir o conteúdo de `App.js`**

  ```javascript
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import { UserProvider } from './src/contexts/UserContext';
  import { ProductProvider } from './src/contexts/ProductContext';
  import { FavoritesProvider } from './src/contexts/FavoritesContext';
  import { DrawerNavigator } from './src/navigation/DrawerNavigator';

  export default function App() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <UserProvider>
            <ProductProvider>
              <FavoritesProvider>
                <DrawerNavigator />
              </FavoritesProvider>
            </ProductProvider>
          </UserProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
  ```

- [ ] **Step 4: Verificar no Snack/emulador**

  O app deve abrir mostrando a tela "Cadastro" (placeholder).
  Deslizando da borda esquerda, o Drawer deve abrir com fundo azul escuro e 4 itens: Cadastro, Catálogo, Favoritos, Dashboard.
  "Detalhes" não deve aparecer no menu.

- [ ] **Step 5: Commit**

  ```bash
  git add src/navigation/ App.js
  git commit -m "feat: configura DrawerNavigator customizado com 5 telas"
  ```

---

## Task 6: Tela de Cadastro

**Files:**
- Modify: `src/screens/Cadastro/index.js`
- Create: `src/screens/Cadastro/styles.js`

- [ ] **Step 1: Criar `src/screens/Cadastro/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: 24,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.textLight,
      marginBottom: 28,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 6,
    },
    input: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: COLORS.text,
      marginBottom: 4,
    },
    inputError: {
      borderColor: COLORS.error,
    },
    errorText: {
      fontSize: 12,
      color: COLORS.error,
      marginBottom: 12,
    },
    fieldWrapper: {
      marginBottom: 16,
    },
    button: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 40,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  ```

- [ ] **Step 2: Substituir `src/screens/Cadastro/index.js`**

  ```javascript
  import React from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import { useForm, Controller } from 'react-hook-form';
  import { useUser } from '../../contexts/UserContext';
  import { postUser } from '../../services/api';
  import styles from './styles';

  export default function CadastroScreen({ navigation }) {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const { login } = useUser();

    const onSubmit = async (data) => {
      try {
        const user = await postUser(data);
        login(user);
        Alert.alert('Cadastro realizado!', `Bem-vindo, ${data.nome}!`, [
          { text: 'Ver Catálogo', onPress: () => navigation.navigate('Catálogo') },
        ]);
      } catch {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro. Verifique sua conexão.');
      }
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para acessar o catálogo</Text>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Nome Completo *</Text>
            <Controller
              control={control}
              name="nome"
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.nome && styles.inputError]}
                  placeholder="Seu nome completo"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>E-mail *</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'E-mail é obrigatório',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Formato de e-mail inválido' },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Senha *</Text>
            <Controller
              control={control}
              name="senha"
              rules={{
                required: 'Senha é obrigatória',
                minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres' },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.senha && styles.inputError]}
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Telefone</Text>
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="(27) 99999-9999"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  ```

- [ ] **Step 3: Verificar no Snack**

  Abra a tela "Cadastro" pelo Drawer.
  Tente submeter sem preencher campos — mensagens de erro devem aparecer abaixo de cada campo.
  Tente e-mail inválido (ex: "abc") — deve mostrar "Formato de e-mail inválido".
  Tente senha com menos de 6 caracteres — deve mostrar mensagem de mínimo.
  Preencha todos os campos corretamente e submeta — deve mostrar alerta de sucesso e oferecer navegar ao Catálogo.

- [ ] **Step 4: Commit**

  ```bash
  git add src/screens/Cadastro/
  git commit -m "feat: implementa tela de Cadastro com React Hook Form e validações"
  ```

---

## Task 7: Componente ProductCard

**Files:**
- Modify: `src/components/ProductCard/index.js`
- Create: `src/components/ProductCard/styles.js`

- [ ] **Step 1: Criar `src/components/ProductCard/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    card: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      flexDirection: 'row',
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: 110,
      height: 110,
    },
    info: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    categoria: {
      fontSize: 11,
      color: COLORS.textLight,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    nome: {
      fontSize: 15,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
    },
    preco: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
  });
  ```

- [ ] **Step 2: Substituir `src/components/ProductCard/index.js`**

  ```javascript
  import React from 'react';
  import { TouchableOpacity, View, Text, Image } from 'react-native';
  import styles from './styles';

  export default function ProductCard({ produto, onPress }) {
    const { nome, preco, categoria, imagem } = produto;

    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: imagem }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.categoria}>{categoria}</Text>
          <Text style={styles.nome} numberOfLines={2}>{nome}</Text>
          <Text style={styles.preco}>R$ {Number(preco).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  ```

---

## Task 8: Tela de Catálogo

**Files:**
- Modify: `src/screens/Catalogo/index.js`
- Create: `src/screens/Catalogo/styles.js`

- [ ] **Step 1: Criar `src/screens/Catalogo/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    pickerContainer: {
      backgroundColor: COLORS.card,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
      paddingHorizontal: 8,
    },
    picker: {
      height: 50,
      color: COLORS.text,
    },
    list: {
      paddingVertical: 8,
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
    },
    errorText: {
      flex: 1,
      textAlign: 'center',
      marginTop: 40,
      color: COLORS.error,
      fontSize: 15,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: COLORS.textLight,
      fontSize: 15,
    },
  });
  ```

- [ ] **Step 2: Substituir `src/screens/Catalogo/index.js`**

  ```javascript
  import React, { useState } from 'react';
  import { View, FlatList, Text, ActivityIndicator } from 'react-native';
  import { Picker } from '@react-native-picker/picker';
  import { useProducts } from '../../contexts/ProductContext';
  import ProductCard from '../../components/ProductCard';
  import { COLORS } from '../../theme';
  import styles from './styles';

  const CATEGORIAS = ['Todos', 'Smartphones', 'Notebooks', 'Acessórios'];

  export default function CatalogoScreen({ navigation }) {
    const { products, loading, error } = useProducts();
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

    const produtosFiltrados =
      categoriaSelecionada === 'Todos'
        ? products
        : products.filter((p) => p.categoria === categoriaSelecionada);

    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoriaSelecionada}
            onValueChange={(value) => setCategoriaSelecionada(value)}
            style={styles.picker}
          >
            {CATEGORIAS.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              produto={item}
              onPress={() => navigation.navigate('Detalhes', { produto: item })}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum produto encontrado para esta categoria.</Text>
          }
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
  ```

- [ ] **Step 3: Verificar no Snack**

  Abra a tela "Catálogo" pelo Drawer.
  Os 9 produtos do MockAPI devem aparecer em cards.
  Selecione "Smartphones" no Picker — apenas 3 produtos devem aparecer.
  Selecione "Todos" — todos os 9 produtos voltam.
  Toque em um produto — nada acontece ainda (Detalhes é placeholder), mas não deve crashar.

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/ProductCard/ src/screens/Catalogo/
  git commit -m "feat: implementa componente ProductCard e tela Catálogo com filtro RNPicker"
  ```

---

## Task 9: Tela de Detalhes

**Files:**
- Modify: `src/screens/Detalhes/index.js`
- Create: `src/screens/Detalhes/styles.js`

- [ ] **Step 1: Criar `src/screens/Detalhes/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    image: {
      width: '100%',
      height: 260,
      backgroundColor: COLORS.border,
    },
    content: {
      padding: 20,
    },
    categoria: {
      fontSize: 12,
      color: COLORS.textLight,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 6,
    },
    nome: {
      fontSize: 22,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 10,
    },
    preco: {
      fontSize: 26,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginBottom: 20,
    },
    descricaoLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
    },
    descricao: {
      fontSize: 15,
      color: COLORS.textLight,
      lineHeight: 22,
      marginBottom: 32,
    },
    button: {
      backgroundColor: COLORS.accent,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonDisabled: {
      backgroundColor: COLORS.success,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  ```

- [ ] **Step 2: Substituir `src/screens/Detalhes/index.js`**

  ```javascript
  import React from 'react';
  import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
  import { useFavorites } from '../../contexts/FavoritesContext';
  import styles from './styles';

  export default function DetalhesScreen({ route }) {
    const { produto } = route.params;
    const { nome, descricao, preco, categoria, imagem } = produto;
    const { addFavorite, isFavorite } = useFavorites();

    const jaEFavorito = isFavorite(produto.id);

    const handleFavorite = () => {
      if (jaEFavorito) {
        Alert.alert('Aviso', 'Este produto já está nos seus favoritos.');
        return;
      }
      addFavorite(produto);
      Alert.alert('Adicionado!', `${nome} foi salvo nos favoritos.`);
    };

    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: imagem }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <Text style={styles.categoria}>{categoria}</Text>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.preco}>R$ {Number(preco).toFixed(2)}</Text>
          <Text style={styles.descricaoLabel}>Descrição</Text>
          <Text style={styles.descricao}>{descricao}</Text>
          <TouchableOpacity
            style={[styles.button, jaEFavorito && styles.buttonDisabled]}
            onPress={handleFavorite}
          >
            <Text style={styles.buttonText}>
              {jaEFavorito ? '★ Já está nos Favoritos' : '☆ Adicionar aos Favoritos'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  ```

- [ ] **Step 3: Verificar no Snack**

  No Catálogo, toque em qualquer produto.
  A tela de Detalhes deve abrir com imagem, nome, preço e descrição.
  Toque em "Adicionar aos Favoritos" — alerta de sucesso deve aparecer.
  Toque novamente — deve mostrar "já está nos favoritos" e botão fica verde.

- [ ] **Step 4: Commit**

  ```bash
  git add src/screens/Detalhes/
  git commit -m "feat: implementa tela de Detalhes com botão de favoritar"
  ```

---

## Task 10: Componente FavoriteCard e tela de Favoritos

**Files:**
- Modify: `src/components/FavoriteCard/index.js`
- Create: `src/components/FavoriteCard/styles.js`
- Modify: `src/screens/Favoritos/index.js`
- Create: `src/screens/Favoritos/styles.js`

- [ ] **Step 1: Criar `src/components/FavoriteCard/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    card: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: 90,
      height: 90,
    },
    info: {
      flex: 1,
      padding: 12,
    },
    nome: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 6,
    },
    preco: {
      fontSize: 15,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    removeButton: {
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeText: {
      fontSize: 18,
      color: COLORS.error,
      fontWeight: 'bold',
    },
  });
  ```

- [ ] **Step 2: Substituir `src/components/FavoriteCard/index.js`**

  ```javascript
  import React from 'react';
  import { TouchableOpacity, View, Text, Image } from 'react-native';
  import styles from './styles';

  export default function FavoriteCard({ produto, onRemove, onPress }) {
    const { nome, preco, imagem } = produto;

    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: imagem }} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.nome} numberOfLines={2}>{nome}</Text>
          <Text style={styles.preco}>R$ {Number(preco).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  ```

- [ ] **Step 3: Criar `src/screens/Favoritos/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    list: {
      paddingVertical: 8,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 80,
    },
    emptyText: {
      fontSize: 16,
      color: COLORS.text,
      fontWeight: '500',
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: COLORS.textLight,
    },
  });
  ```

- [ ] **Step 4: Substituir `src/screens/Favoritos/index.js`**

  ```javascript
  import React from 'react';
  import { View, FlatList, Text } from 'react-native';
  import { useFavorites } from '../../contexts/FavoritesContext';
  import FavoriteCard from '../../components/FavoriteCard';
  import styles from './styles';

  export default function FavoritosScreen({ navigation }) {
    const { favorites, removeFavorite } = useFavorites();

    return (
      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FavoriteCard
              produto={item}
              onRemove={() => removeFavorite(item.id)}
              onPress={() => navigation.navigate('Detalhes', { produto: item })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
              <Text style={styles.emptySubtext}>Explore o catálogo e salve produtos!</Text>
            </View>
          }
          contentContainerStyle={[styles.list, { flexGrow: 1 }]}
        />
      </View>
    );
  }
  ```

- [ ] **Step 5: Verificar no Snack**

  Favoritar 2-3 produtos via tela de Detalhes.
  Abrir "Favoritos" pelo Drawer — os produtos favoritados devem aparecer.
  Tocar no ✕ de um produto — ele deve sumir da lista imediatamente.
  Remover todos os itens — mensagem "Nenhum favorito ainda" deve aparecer.
  Tocar em um card de favorito — deve navegar para Detalhes do produto.

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/FavoriteCard/ src/screens/Favoritos/
  git commit -m "feat: implementa componente FavoriteCard e tela de Favoritos"
  ```

---

## Task 11: Componente DashboardCard e tela de Dashboard

**Files:**
- Modify: `src/components/DashboardCard/index.js`
- Create: `src/components/DashboardCard/styles.js`
- Modify: `src/screens/Dashboard/index.js`
- Create: `src/screens/Dashboard/styles.js`

- [ ] **Step 1: Criar `src/components/DashboardCard/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      margin: 6,
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      minHeight: 110,
      justifyContent: 'center',
    },
    icon: {
      fontSize: 26,
      marginBottom: 8,
    },
    label: {
      fontSize: 11,
      color: COLORS.textLight,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    value: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 11,
      color: COLORS.textLight,
      textAlign: 'center',
      marginTop: 4,
    },
  });
  ```

- [ ] **Step 2: Substituir `src/components/DashboardCard/index.js`**

  ```javascript
  import React from 'react';
  import { View, Text } from 'react-native';
  import styles from './styles';

  export default function DashboardCard({ label, value, subtitle, icon }) {
    return (
      <View style={styles.card}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
        ) : null}
      </View>
    );
  }
  ```

- [ ] **Step 3: Criar `src/screens/Dashboard/styles.js`**

  ```javascript
  import { StyleSheet } from 'react-native';
  import { COLORS } from '../../theme';

  export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 12,
      marginTop: 8,
    },
    chartContainer: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
    },
    cardsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -6,
    },
    emptyText: {
      flex: 1,
      textAlign: 'center',
      marginTop: 60,
      color: COLORS.textLight,
      fontSize: 15,
    },
  });
  ```

- [ ] **Step 4: Substituir `src/screens/Dashboard/index.js`**

  ```javascript
  import React, { useMemo } from 'react';
  import { View, Text, ScrollView, Dimensions } from 'react-native';
  import { PieChart } from 'react-native-chart-kit';
  import { useProducts } from '../../contexts/ProductContext';
  import DashboardCard from '../../components/DashboardCard';
  import styles from './styles';

  const screenWidth = Dimensions.get('window').width - 32;

  const CORES_CATEGORIA = {
    Smartphones: '#1565C0',
    Notebooks: '#FF6F00',
    'Acessórios': '#2E7D32',
  };

  export default function DashboardScreen() {
    const { products } = useProducts();

    const { maisBarato, maisCaro, totalItens, dadosPizza } = useMemo(() => {
      if (!products.length) {
        return { maisBarato: null, maisCaro: null, totalItens: 0, dadosPizza: [] };
      }

      const sorted = [...products].sort((a, b) => Number(a.preco) - Number(b.preco));
      const categorias = ['Smartphones', 'Notebooks', 'Acessórios'];

      const dadosPizza = categorias
        .map((cat) => ({
          name: cat,
          count: products.filter((p) => p.categoria === cat).length,
          color: CORES_CATEGORIA[cat],
          legendFontColor: '#212121',
          legendFontSize: 13,
        }))
        .filter((d) => d.count > 0);

      return {
        maisBarato: sorted[0],
        maisCaro: sorted[sorted.length - 1],
        totalItens: products.length,
        dadosPizza,
      };
    }, [products]);

    if (!products.length) {
      return <Text style={styles.emptyText}>Carregando dados do catálogo...</Text>;
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Distribuição por Categoria</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={dadosPizza}
            width={screenWidth}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
              backgroundColor: 'transparent',
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        <Text style={styles.sectionTitle}>Destaques do Catálogo</Text>
        <View style={styles.cardsRow}>
          <DashboardCard
            label="Total de Produtos"
            value={String(totalItens)}
            icon="📦"
          />
          <DashboardCard
            label="Mais Caro"
            value={`R$ ${Number(maisCaro?.preco).toFixed(2)}`}
            subtitle={maisCaro?.nome}
            icon="💎"
          />
          <DashboardCard
            label="Mais Barato"
            value={`R$ ${Number(maisBarato?.preco).toFixed(2)}`}
            subtitle={maisBarato?.nome}
            icon="🏷️"
          />
        </View>
      </ScrollView>
    );
  }
  ```

- [ ] **Step 5: Verificar no Snack**

  Abrir "Dashboard" pelo Drawer.
  O gráfico de pizza deve mostrar 3 fatias coloridas (azul = Smartphones, laranja = Notebooks, verde = Acessórios), cada uma com a quantidade de produtos.
  Os 3 cards de destaque devem mostrar: total (9), produto mais caro (MacBook Air M2 - R$ 9999.99), produto mais barato (Teclado Redragon K552 - R$ 299.99).

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/DashboardCard/ src/screens/Dashboard/
  git commit -m "feat: implementa componente DashboardCard e tela Dashboard com gráfico de pizza"
  ```

---

## Task 12: Revisão final e polimento

**Files:**
- Review: todos os arquivos

- [ ] **Step 1: Testar o fluxo completo**

  Percorra o fluxo ponta a ponta:
  1. Abrir o app → tela de Cadastro
  2. Tentar enviar formulário vazio → erros de validação aparecem
  3. Preencher todos os campos corretamente → alerta de sucesso → navegar ao Catálogo
  4. No Catálogo, filtrar por "Notebooks" → aparecem 3 produtos
  5. Tocar em "MacBook Air M2" → tela de Detalhes abre
  6. Tocar em "Adicionar aos Favoritos" → alerta de sucesso
  7. Tocar em "Adicionar aos Favoritos" novamente → alerta "já está nos favoritos"
  8. Abrir Drawer → ir para "Favoritos" → MacBook Air deve aparecer
  9. Remover o favorito com ✕ → lista fica vazia com mensagem
  10. Ir para "Dashboard" → gráfico de pizza e cards visíveis

- [ ] **Step 2: Verificar tratamento de erros**

  Com BASE_URL incorreta em `api.js`: a tela de Catálogo deve mostrar mensagem de erro em vez de crashar.
  Corrija a BASE_URL para a URL real do MockAPI antes de entregar.

- [ ] **Step 3: Commit final**

  ```bash
  git add .
  git commit -m "feat: app de catálogo de eletrônicos completo"
  ```

---

## Checklist de Requisitos do Trabalho

| Requisito | Implementado em |
|---|---|
| Cadastro de usuário com validação | Task 6 — `screens/Cadastro` + React Hook Form |
| 3 telas customizadas | Tasks 8, 9, 10, 11 — Catálogo, Detalhes, Favoritos, Dashboard |
| API REST GET | Task 8 — `ProductContext` → `getProducts()` |
| API REST POST | Task 6 — `CadastroScreen` → `postUser()` |
| Drawer Navigator customizado | Task 5 — `DrawerNavigator.js` |
| useContext / createContext | Task 4 — 3 contexts |
| Desestruturação direta e indireta | Task 9 — `const { produto } = route.params` + props |
| FlatList + RNPicker (filtro) | Task 8 — `CatalogoScreen` |
| Componentização (index.js + styles.js) | Tasks 7, 10, 11 — ProductCard, FavoriteCard, DashboardCard |
