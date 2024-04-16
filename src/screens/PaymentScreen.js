import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  CardField,
  confirmPayment,
  createToken,
} from '@stripe/stripe-react-native';
import Button from '../components/Button';
import createPaymentIntent from '../api/stripeApi';

const PaymentScreen = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const fetchCardDetails = cardDetails => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };
  const onDone = async () => {
    let apiData = {
      amount: 502,
      currency: 'eur',
    };
    if (cardInfo) {
      try {
        const res = await createPaymentIntent(apiData);
        console.log('Payment intent genrate successfully', res);
        if (res?.data?.paymentIntent) {
          let confirmPaymentIntent = await confirmPayment(
            res?.data?.paymentIntent,
            {
              paymentMethodType: 'Card',
            },
          );
          console.log('confirmPaymentIntent', confirmPaymentIntent);
          alert('Payment SuccessFully');
        }
      } catch (error) {
        console.log('ERROR', error.message);
      }
      //   try {
      //     const resToken = await createToken({...cardInfo, type: 'Card'});
      //   } catch (error) {
      //     console.log('ERROR DURING TOKEN GENERATION');
      //   }
    }
    console.log('MY CARD is ', cardInfo);
  };
  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          fetchCardDetails(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={onDone} disable={!cardInfo} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
