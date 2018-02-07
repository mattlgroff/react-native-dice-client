import React, { Component } from 'react';
import Die from '../Die/Die';
import { Text, View } from 'react-native';
let id = 0; //Give our die's unique key values

class Dice extends Component {
  
  render() {
    return (
      <View className="Dice">
        <Text>Click above to roll the dice!</Text>
        <Text>Total Value: {this.props.total}</Text>
        <Text>Invidiual Die Rolls:</Text>
        {
          
          this.props.dice.map(value => {
            id += 1;

            return (
              <Die key={id} value={value} size={this.props.size}/>
            )
          })
        }
      </View>
    );
  }
}

export default Dice;
