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
      <Text style={styles.drawerTitle}>⚡ TechZone</Text>
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
