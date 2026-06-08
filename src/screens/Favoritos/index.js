import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useFavorites } from '../../contexts/FavoritesContext';
import FavoriteCard from '../../components/FavoriteCard';
import styles from './styles';

export default function FavoritosScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={({ item }) => (
          <FavoriteCard
            produto={item}
            onRemove={() => removeFavorite(item.id)}
            onPress={() => navigation.navigate('Detalhes', { produto: item, from: 'Favoritos' })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
            <Text style={styles.emptySubtext}>Explore o catálogo e salve produtos!</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Catálogo')}>
              <Text style={styles.btnText}>Ir para o Catálogo</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={[styles.list, { flexGrow: 1 }]}
      />
    </View>
  );
}
