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
