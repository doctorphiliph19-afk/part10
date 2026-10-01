import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import SignInForm from './SignInForm';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
