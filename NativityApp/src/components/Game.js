/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Game extends Component<Props> {
  target = 10 + Math.floor(40 * Math.random());
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingTop: 30,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    textAlign: 'center',
    marginHorizontal: 50,
  },
});
