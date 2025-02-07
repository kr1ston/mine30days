import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './src/navigation/index';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;
