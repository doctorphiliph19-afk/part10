import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await mutate({
        variables: {
          user: { username, password },
        },
      });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
