import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import Text from './Text';
import AuthStorage from '../utils/authStorage';
import { ME } from '../graphql/queries';

const authStorage = new AuthStorage();

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Link to="/" style={styles.tab}>
          <Text color="white" fontWeight="bold" style={styles.tabText}>
            Repositories
          </Text>
        </Link>
        {data?.me ? (
          <Pressable onPress={signOut} style={styles.tab}>
            <Text color="white" fontWeight="bold" style={styles.tabText}>
              Sign out
            </Text>
          </Pressable>
        ) : (
          <Link to="/signin" style={styles.tab}>
            <Text color="white" fontWeight="bold" style={styles.tabText}>
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
