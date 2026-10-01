import { useQuery } from '@apollo/client';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 16,
  },
});

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !data?.repository) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Unable to load repository.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} showGitHubButton />
    </View>
  );
};

export default SingleRepository;
