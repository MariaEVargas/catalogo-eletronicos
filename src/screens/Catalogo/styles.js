import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pickerContainer: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    color: COLORS.text,
  },
  list: {
    paddingVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.error,
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textLight,
    fontSize: 15,
  },
});
