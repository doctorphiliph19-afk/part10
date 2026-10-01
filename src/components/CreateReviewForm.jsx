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
  reviewInput: {
    height: 80,
    paddingTop: 12,
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string(),
});

const FormField = ({
  name,
  placeholder,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  keyboardType,
  multiline = false,
}) => {
  const error = touched[name] && errors[name];

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.reviewInput,
          error && styles.invalidInput,
        ]}
        placeholder={placeholder}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        keyboardType={keyboardType}
        multiline={multiline}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const CreateReviewForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <FormField
          name="ownerName"
          placeholder="Repository owner name"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormField
          name="repositoryName"
          placeholder="Repository name"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <FormField
          name="rating"
          placeholder="Rating between 0 and 100"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          keyboardType="numeric"
        />
        <FormField
          name="text"
          placeholder="Review"
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          multiline
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text color="white" fontSize="subheading" fontWeight="bold">
            Create a review
          </Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

export default CreateReviewForm;