import { NativeRouter } from 'react-router-native';
import AppBar from './src/components/AppBar';
import Main from './src/components/Main';

const App = () => {
  return (
    <NativeRouter>
      <AppBar />
      <Main />
    </NativeRouter>
  );
};

export default App;
