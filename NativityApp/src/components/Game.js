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
    selectedIds: [],
  };
  //our psuedo-randomly generated numbers array
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  //the target we are trying to sum up to
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0); //this is easiest way to sum array. Starting from zero is a fail safe in case the array is empty
  
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };
  //gameStatus computes the status of the game[PLAYING, WON, LOST]
  //at any time during the game. It's a function and not part of state
  //because it is computed from the selectedIds array which IS
  //stored in state
  //TODO: Learn reduce inside out and other common use-cases
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    else {
      return 'LOST';
    } 
    console.warn(sumSelected);
  }
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            <RandomNumber 
              key={index} 
              id={index}
              number={randomNumber} 
              isSelected={
                this.isNumberSelected(index) || gameStatus != 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          )}
        </View>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}0

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
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
