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
