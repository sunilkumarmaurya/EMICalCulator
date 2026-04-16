import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EMICalculatorScreen from './src/EMICalculatorScreen';

export type EMICalculatorStackParamList = {
  EMICalculatorHome: undefined;
};

const Stack = createNativeStackNavigator<EMICalculatorStackParamList>();

const EMICalculatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EMICalculatorHome"
        component={EMICalculatorScreen}
        options={{ title: 'EMI Calculator' }}
      />
    </Stack.Navigator>
  );
};

export default EMICalculatorStack;
