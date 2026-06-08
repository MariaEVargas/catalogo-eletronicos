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
