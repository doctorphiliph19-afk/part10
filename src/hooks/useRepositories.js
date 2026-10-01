import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repositories = data?.repositories.edges.map(({ node }) => node) ?? [];

  return { repositories, loading, error };
};

export default useRepositories;