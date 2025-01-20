import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StopWatchScreen from '../screens/StopWatchScreen';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="计时器" component={StopWatchScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
