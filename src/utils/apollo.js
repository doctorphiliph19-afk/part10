import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AuthStorage from './authStorage';

const authStorage = new AuthStorage();
const httpLink = new HttpLink({ uri: Constants.manifest?.extra?.apolloUri });
const authLink = setContext(async (_, { headers }) => {
  const accessToken = await authStorage.getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;