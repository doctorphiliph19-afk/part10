import { StyleSheet, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repositories/:repositoryId" element={<SingleRepository />} />
        <Route path="/create/review" element={<CreateReview />} />
      </Routes>
    </View>
  );
};

export default Main;
