/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

type Props = {};
export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedNumbers: [0,4],
  };
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0); //this is easiest way to sum array. Starting from zero is a fail safe in case the array is empty
  
  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex],
    }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            <RandomNumber 
              key={index} 
              id={index}
              number={randomNumber} 
              isSelected={this.isNumberSelected(index)}
              onPress={this.selectNumber}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    textAlign: 'center',
    margin: 20,
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  random: {
    backgroundColor: 'green',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center',
  },
});
