import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../../contexts/UserContext';
import { postUser } from '../../services/api';
import styles from './styles';

export default function CadastroScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useUser();

  const onSubmit = async (data) => {
    try {
      const user = await postUser(data);
      login(user);
      Alert.alert('Cadastro realizado!', `Bem-vindo, ${data.nome}!`, [
        { text: 'Ver Catálogo', onPress: () => navigation.navigate('Catálogo') },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Verifique sua conexão.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para acessar o catálogo</Text>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Nome Completo *</Text>
          <Controller
            control={control}
            name="nome"
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.nome && styles.inputError]}
                placeholder="Seu nome completo"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}
        </View>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>E-mail *</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'E-mail é obrigatório',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Formato de e-mail inválido' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Senha *</Text>
          <Controller
            control={control}
            name="senha"
            rules={{
              required: 'Senha é obrigatória',
              minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.senha && styles.inputError]}
                placeholder="Mínimo 6 caracteres"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}
        </View>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Telefone</Text>
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="(27) 99999-9999"
                keyboardType="phone-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
