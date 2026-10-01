import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  date: {
    marginTop: 4,
  },
  reviewText: {
    marginTop: 16,
  },
  repositoryButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: '#e1e4e8',
    height: 10,
  },
  message: {
    padding: 16,
  },
});

const ReviewItem = ({ review, onViewRepository }) => (
  <View style={styles.review}>
    <View style={styles.rating}>
      <Text color="primary" fontSize="subheading" fontWeight="bold">
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewContent}>
      <Text fontWeight="bold">{review.user.username}</Text>
      <Text color="textSecondary" style={styles.date}>
        {format(new Date(review.createdAt), 'dd MMM yyyy')}
      </Text>
      <Text fontWeight="bold" style={styles.reviewText}>
        {review.repository.fullName}
      </Text>
      {review.text ? <Text style={styles.reviewText}>{review.text}</Text> : null}
      <Pressable
        accessibilityRole="button"
        onPress={() => onViewRepository(review.repositoryId)}
        style={styles.repositoryButton}
      >
        <Text color="white" fontWeight="bold">
          View repository
        </Text>
      </Pressable>
    </View>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const navigate = useNavigate();

  if (loading && !data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !data?.me) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Unable to load your reviews.</Text>
      </View>
    );
  }

  const reviews = data.me.reviews.edges.map(({ node }) => node);

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onViewRepository={(repositoryId) =>
            navigate(`/repositories/${repositoryId}`)
          }
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
