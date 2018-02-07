import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Die extends Component {
  constructor(){
    super();

    this.state = {
      class: 'decent'
    }
  }

  // Runs on every mount to ensure that the die is 
  // colored correctly for crit success or fail
  refreshCss(){
    let size = parseInt(this.props.size, 10)

    if(this.props.value === size){
      this.setState({'class':'crit_success'})
    }
    else if(this.props.value === 1){
      this.setState({'class':'crit_fail'})
    }
  }

  componentDidMount(){
   this.refreshCss(); 
  }

  render() {
    return (
      <View className="Die">
        <Text className={this.state.class}>{this.props.value}</Text>
      </View>
    );
  }
}

export default Die;


const styles = StyleSheet.create({
  '.crit_success': {
    color: 'green'
  },

  '.crit_fail': {
    color: 'red'
  },

  '.decent': {
    color: 'black'
  },

  '.Die': {
    fontSize: 14
  },
});
