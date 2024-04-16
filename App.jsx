import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {SP_KEY, S_KEY} from 'react-native-dotenv';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './src/screens/PaymentScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey={SP_KEY}>
        <PaymentScreen />
      </StripeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#396561',
  },
  text: {
    color: '#ffffff',
  },
});

export default App;
