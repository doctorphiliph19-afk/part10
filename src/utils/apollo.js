import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: Constants.manifest?.extra?.apolloUri }),
  cache: new InMemoryCache(),
});

export default apolloClient;