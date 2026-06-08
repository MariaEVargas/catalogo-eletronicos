import React, { useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useProducts } from '../../contexts/ProductContext';
import DashboardCard from '../../components/DashboardCard';
import styles from './styles';

const screenWidth = Dimensions.get('window').width - 32;

const CORES_CATEGORIA = {
  Smartphones: '#1565C0',
  Notebooks: '#FF6F00',
  'Acessórios': '#2E7D32',
};

export default function DashboardScreen() {
  const { products } = useProducts();

  const { maisBarato, maisCaro, totalItens, dadosPizza } = useMemo(() => {
    if (!products.length) {
      return { maisBarato: null, maisCaro: null, totalItens: 0, dadosPizza: [] };
    }

    const sorted = [...products].sort((a, b) => Number(a.preco) - Number(b.preco));
    const categorias = ['Smartphones', 'Notebooks', 'Acessórios'];

    const dadosPizza = categorias
      .map((cat) => ({
        name: cat,
        count: products.filter((p) => p.categoria === cat).length,
        color: CORES_CATEGORIA[cat],
        legendFontColor: '#212121',
        legendFontSize: 13,
      }))
      .filter((d) => d.count > 0);

    return {
      maisBarato: sorted[0],
      maisCaro: sorted[sorted.length - 1],
      totalItens: products.length,
      dadosPizza,
    };
  }, [products]);

  if (!products.length) {
    return <Text style={styles.emptyText}>Carregando dados do catálogo...</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>Distribuição por Categoria</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={dadosPizza}
          width={screenWidth}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(21, 101, 192, ${opacity})`,
            backgroundColor: 'transparent',
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <Text style={styles.sectionTitle}>Destaques do Catálogo</Text>
      <View style={styles.cardsRow}>
        <DashboardCard
          label="Total de Produtos"
          value={String(totalItens)}
          icon="📦"
        />
        <DashboardCard
          label="Mais Caro"
          value={`R$ ${Number(maisCaro?.preco).toFixed(2)}`}
          subtitle={maisCaro?.nome}
          icon="💎"
        />
        <DashboardCard
          label="Mais Barato"
          value={`R$ ${Number(maisBarato?.preco).toFixed(2)}`}
          subtitle={maisBarato?.nome}
          icon="🏷️"
        />
      </View>
    </ScrollView>
  );
}
