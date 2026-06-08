import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function DashboardCard({ label, value, subtitle, icon }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
