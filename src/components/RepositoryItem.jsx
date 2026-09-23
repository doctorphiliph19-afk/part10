import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  language: {
    fontSize: 16,
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>Full name: {item.fullName}</Text>

      <Text style={styles.description}>Description: {item.description}</Text>

      <Text style={styles.language}>Language: {item.language}</Text>

      <Text style={styles.stats}>Stars: {item.stargazersCount}</Text>

      <Text style={styles.stats}>Forks: {item.forksCount}</Text>

      <Text style={styles.stats}>Reviews: {item.reviewCount}</Text>

      <Text style={styles.stats}>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
