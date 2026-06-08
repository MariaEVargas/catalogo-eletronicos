import 'react-native-gesture-handler';
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
