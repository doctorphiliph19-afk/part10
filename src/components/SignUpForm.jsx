import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const FormField = ({
  name,
  placeholder,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const error = touched[name] && errors[name];

  return (
    <View>
      <TextInput
        style={[styles.input, error && styles.invalidInput]}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={name !== 'username'}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const SignUpForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ username: '', password: '', passwordConfirmation: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <FormField
          name="username"
          placeholder="Username"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormField
          name="password"
          placeholder="Password"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormField
          name="passwordConfirmation"
          placeholder="Password confirmation"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text color="white" fontSize="subheading" fontWeight="bold">
            Sign up
          </Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default SignUpForm;
