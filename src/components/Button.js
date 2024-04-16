import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({text = 'Done', onPress, disable = false}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: disable ? 'grey' : '#b6e2b6',
      }}
      onPress={onPress}
      disabled={disable}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b6e2b6',
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: '#323330', fontSize: 20},
});
