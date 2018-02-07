import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import Dice from './components/Dice/Dice';
import Axios from './utility/Axios.js';
import Hyperlink from 'react-native-hyperlink';

export default class App extends React.Component {

  constructor(){
    super();

    this.state = {
      num_of_dice: 1,
      size_of_dice: 20,
      dice: [],
      total: 0,
      min: 0,
      max: 0,
      input: '0d0',
      error_msg: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    Axios.rollDice(this.state.num_of_dice, this.state.size_of_dice)
    .then(res => {
      const data = res.data.results;

      // If an error message exists
      if(res.data.error_msg){
        this.setState({'error_msg': res.data.error_msg})
      }
      // If no error message
      else{
        this.setState(
        {
          'min': data.min,
          'max': data.max,
          'dice': data.results,
          'total': data.total
        })
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>React Native DAAS Demo</Text>
        <Hyperlink linkDefault={ true }>
          <Text>Check out the source at the Github Repo https://github.com/mattlgroff/dice-as-a-service</Text>
        </Hyperlink>
        <Text>Number of Dice</Text>
        <TextInput 
          className="text-input"
          keyboardType="numeric" 
          onChangeText={num => this.setState({num_of_dice: num})} 
          placeholder={this.state.num_of_dice.toString()} 
        />

        <Text className='boldBig'>Size of Die</Text>
        <TextInput 
          className="text-input"
          keyboardType="numeric" 
          onChangeText={size => this.setState({size_of_dice: size})} 
          placeholder={this.state.size_of_dice.toString()} 
        />
        <Button onPress={this.handleSubmit} title={`Roll ${this.state.num_of_dice}d${this.state.size_of_dice}`} />
        <Dice dice={this.state.dice} num={this.state.num_of_dice} size={this.state.size_of_dice} total={this.state.total} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'text-input': {
    height: 40, 
    width: 50, 
    borderColor: 'gray', 
    borderWidth: 1, 
    color: 'white', 
    backgroundColor: 'black',
    margin: 20
  },
});
