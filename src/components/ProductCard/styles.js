import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  categoria: {
    fontSize: 11,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
  },
});
