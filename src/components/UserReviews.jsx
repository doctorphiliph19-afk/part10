import { useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#d73a4a',
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  actions: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  separator: {
    backgroundColor: '#e1e4e8',
    height: 10,
  },
  message: {
    padding: 16,
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    backgroundColor: theme.colors.white,
    borderRadius: 3,
    maxWidth: 560,
    paddingHorizontal: 24,
    paddingTop: 24,
    width: '100%',
  },
  dialogTitle: {
    fontSize: 24,
    marginBottom: 12,
  },
  dialogMessage: {
    fontSize: 18,
  },
  dialogActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 28,
    minHeight: 56,
  },
  dialogAction: {
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 12,
  },
  dialogActionText: {
    color: '#2675a8',
  },
});

const ReviewItem = ({ review, onViewRepository, onDeleteReview }) => (
  <View>
    <View style={styles.review}>
      <View style={styles.rating}>
        <Text color="primary" fontSize="subheading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="textSecondary" style={styles.date}>
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>
        {review.text ? <Text style={styles.reviewText}>{review.text}</Text> : null}
      </View>
    </View>
    <View style={styles.actions}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onViewRepository(review.repositoryId)}
        style={styles.repositoryButton}
      >
        <Text color="white" fontWeight="bold">
          View repository
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => onDeleteReview(review)}
        style={styles.deleteButton}
      >
        <Text color="white" fontWeight="bold">
          Delete review
        </Text>
      </Pressable>
    </View>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const navigate = useNavigate();

  const confirmDelete = async () => {
    if (!reviewToDelete) {
      return;
    }

    try {
      const { data: result } = await deleteReview({
        variables: { id: reviewToDelete.id },
      });

      setReviewToDelete(null);
      if (result?.deleteReview) {
        await refetch();
      }
    } catch (deleteError) {
      setReviewToDelete(null);
      console.log(deleteError);
    }
  };

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
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            onViewRepository={(repositoryId) =>
              navigate(`/repositories/${repositoryId}`)
            }
            onDeleteReview={setReviewToDelete}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
      <Modal
        animationType="fade"
        onRequestClose={() => setReviewToDelete(null)}
        transparent
        visible={reviewToDelete !== null}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => setReviewToDelete(null)}
          style={styles.modalBackdrop}
        >
          <View style={styles.dialog}>
            <Text fontSize="heading" fontWeight="bold" style={styles.dialogTitle}>
              Delete review
            </Text>
            <Text style={styles.dialogMessage}>
              Are you sure you want to delete this review?
            </Text>
            <View style={styles.dialogActions}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setReviewToDelete(null)}
                style={styles.dialogAction}
              >
                <Text fontWeight="bold" style={styles.dialogActionText}>
                  CANCEL
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={confirmDelete}
                style={styles.dialogAction}
              >
                <Text fontWeight="bold" style={styles.dialogActionText}>
                  DELETE
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default UserReviews;
