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
