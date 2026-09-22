import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },

  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    marginBottom: 8,
    color: '#555',
  },

  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 5,
    borderRadius: 4,
    marginBottom: 10,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stat: {
    alignItems: 'center',
  },

  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  statLabel: {
    fontSize: 13,
    color: '#555',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>

      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.language}>{item.language}</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.stargazersCount}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.forksCount}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
