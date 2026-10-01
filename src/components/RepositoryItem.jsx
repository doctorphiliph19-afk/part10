import { Linking, Pressable, View, StyleSheet, Image } from 'react-native';
import Text from './Text.jsx';
import theme from '../theme.js';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  repositoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  githubButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 14,
  },
  githubButtonText: {
    color: theme.colors.white,
  },
});

const formatCount = (count) => {
  if (count < 1000) {
    return count.toString();
  }

  return `${(count / 1000).toFixed(1)}k`;
};

const Statistic = ({ value, label }) => {
  return (
    <View style={styles.stat}>
      <Text fontSize="subheading" fontWeight="bold">{value}</Text>
      <Text fontSize="subheading" color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={styles.repositoryInfo}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>

          <Text color="textSecondary">{item.description}</Text>

          <Text style={styles.language} color="white">
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Statistic
          value={formatCount(item.stargazersCount)}
          label="Stars"
        />

        <Statistic
          value={formatCount(item.forksCount)}
          label="Forks"
        />

        <Statistic value={item.reviewCount} label="Reviews" />

        <Statistic value={item.ratingAverage} label="Rating" />
      </View>

      {showGitHubButton && (
        <Pressable
          accessibilityRole="button"
          onPress={() => Linking.openURL(item.url)}
          style={styles.githubButton}
        >
          <Text fontSize="subheading" fontWeight="bold" style={styles.githubButtonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
