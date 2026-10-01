import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 16,
  },
  review: {
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    padding: 24,
  },
  rating: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 38,
    borderWidth: 3,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 24,
  },
  reviewDate: {
    marginTop: 4,
  },
  reviewText: {
    marginTop: 16,
  },
  separator: {
    backgroundColor: '#e1e4e8',
    height: 10,
  },
});

const ReviewItem = ({ review }) => (
  <View style={styles.review}>
    <View style={styles.rating}>
      <Text color="primary" fontSize="subheading" fontWeight="bold">
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewContent}>
      <Text fontWeight="bold">{review.user.username}</Text>
      <Text color="textSecondary" style={styles.reviewDate}>
        {format(new Date(review.createdAt), 'dd MMM yyyy')}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

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

  const reviews = data.repository.reviews.edges.map(({ node }) => node);

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryItem item={data.repository} showGitHubButton />
      }
    />
  );
};

export default SingleRepository;
