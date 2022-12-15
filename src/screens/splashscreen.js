import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/wellcome.png'

const App = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace('firstscreen');
  }, 3000);
    return (
    <View style= {styles.container}>
        <Image source={Logo} style={styles.logo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    flex: 1,
    width: 193.63,
    height: 77.19,
    top: 200,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
})
export default App