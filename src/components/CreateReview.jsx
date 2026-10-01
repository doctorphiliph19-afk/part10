import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import CreateReviewForm from './CreateReviewForm';

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;