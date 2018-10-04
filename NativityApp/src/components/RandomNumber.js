import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight, Text} from 'react-native';
import PropTypes from 'prop-types';


export default class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  	number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    if (this.props.isSelected) { return; }
    this.props.onPress(this.props.id);  
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

