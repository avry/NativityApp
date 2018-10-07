/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Game from './Game';



type Props = {};
export default class App extends Component<Props> {
  state = {
  	gameId: 1,
  };
  resetGame = () => {
  	return { gameId: prevState.gameId + 1 };
  }
  render() {
    return (
      <Game 
      	key={this.state.gameId} 
      	onPlayAgain={this.resetGame}
      	randomNumberCount={6} 
      	initialSeconds={10}
      />
    );
  }
}
