import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text} from 'react-native';
import PropTypes from 'prop-types';


export default class RandomNumber extends Component {
  static propTypes = {
  	number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };
  handlePress = () => {
    console.log(this.props.number);  
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}> 
        <Text style={[styles.random, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: 'green',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});

