import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
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
  return (
    <View style={styles.container}>
      <Link to="/" style={styles.tab}>
        <Text color="white" fontWeight="bold" style={styles.tabText}>
          Repositories
        </Text>
      </Link>
      <Link to="/signin" style={styles.tab}>
        <Text color="white" fontWeight="bold" style={styles.tabText}>
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;
