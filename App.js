import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import AppBar from './src/components/AppBar';
import Main from './src/components/Main';
import apolloClient from './src/utils/apollo';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <AppBar />
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
};

export default App;
