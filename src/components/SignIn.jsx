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
  invalidInput: {
    borderColor: '#d73a4a',
    marginBottom: 0,
  },
  error: {
    color: '#d73a4a',
    marginTop: 8,
    marginHorizontal: 4,
    marginBottom: 18,
  },
  button: {
    height: 56,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const FormField = ({
  name,
  placeholder,
  secureTextEntry = false,
  autoCapitalize,
  autoCorrect,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) => {
  const error = touched[name] && errors[name];

  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.invalidInput]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <FormField
            name="username"
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
          />
          <FormField
            name="password"
            placeholder="Password"
            secureTextEntry
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
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