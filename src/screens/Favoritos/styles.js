import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  btn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
});
