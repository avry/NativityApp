/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Button, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';

import RandomNumber from './RandomNumber';


type Props = {};
export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain : PropTypes.func.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  gameStatus = 'PLAYING';
  //our psuedo-randomly generated numbers array
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  //the target we are trying to sum up to
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0); //this is easiest way to sum array. Starting from zero is a fail safe in case the array is empty
  shuffledRandomNumbers = shuffle(this.randomNumbers); 
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
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds ===0 ) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };
  componentDidMount() {
    //TODO: understand fully setInterval and explore other common use-cases
    this.intervalId = setInterval(
      () => {
        this.setState((prevState) => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        }, 
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        });
      }, 1000);
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const gameStatus = this.gameStatus
    
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => 
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
        {this.gameStatus !== 'PLAYING' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
        <Text>{ this.state.remainingSeconds }</Text>
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
  //These are dynamic styles rules
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
