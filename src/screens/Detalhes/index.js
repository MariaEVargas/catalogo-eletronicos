import React, { useLayoutEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../contexts/FavoritesContext';
import { COLORS } from '../../theme';
import styles from './styles';

export default function DetalhesScreen({ route, navigation }) {
  const produto = route.params?.produto;

  const from = route.params?.from ?? 'Catálogo';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(from)} style={{ marginLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, from]);

  if (!produto) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: '#666' }}>Produto não encontrado.</Text>
      </View>
    );
  }

  const { nome, descricao, preco, categoria, imagem } = produto;
  const { addFavorite, isFavorite } = useFavorites();

  const jaEFavorito = isFavorite(produto.id);

  const handleFavorite = () => {
    if (jaEFavorito) {
      Platform.OS === 'web'
        ? window.alert('Aviso\nEste produto já está nos seus favoritos.')
        : Alert.alert('Aviso', 'Este produto já está nos seus favoritos.');
      return;
    }
    addFavorite(produto);
    Platform.OS === 'web'
      ? window.alert(`Adicionado!\n${nome} foi salvo nos favoritos.`)
      : Alert.alert('Adicionado!', `${nome} foi salvo nos favoritos.`);
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
