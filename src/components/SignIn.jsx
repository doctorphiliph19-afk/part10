import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 18,
  },
  input: {
    height: 48,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    fontSize: 16,
    fontFamily: theme.fonts.main,
  },
  button: {
    height: 56,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.username}
            onChangeText={handleChange('username')}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;