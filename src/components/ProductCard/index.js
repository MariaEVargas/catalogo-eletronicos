import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './styles';

export default function ProductCard({ produto, onPress }) {
  const { nome, preco, categoria, imagem } = produto;
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {imgError || !imagem ? (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.imagePlaceholderText}>📷</Text>
        </View>
      ) : (
        <Image
          source={{ uri: imagem }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.categoria}>{categoria}</Text>
        <Text style={styles.nome} numberOfLines={2}>{nome}</Text>
        <Text style={styles.preco}>R$ {Number(preco).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}
