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
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={({ item }) => (
          <ProductCard
            produto={item}
            onPress={() => navigation.navigate('Detalhes', { produto: item, from: 'Catálogo' })}
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
