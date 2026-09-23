import { View, Text, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
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
      <Pressable style={styles.tab}>
        <Text style={styles.tabText}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
