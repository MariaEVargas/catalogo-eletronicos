import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  preco: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  removeButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 18,
    color: COLORS.error,
    fontWeight: 'bold',
  },
});
