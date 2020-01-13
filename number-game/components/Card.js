import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style = {} }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    // shdowsはiOSにか使えない。Androidのためにelevationを指定することでAndroiのデフォルトのshadowを指定できる
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
