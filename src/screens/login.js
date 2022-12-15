import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios, { Axios } from 'axios';
import Logo from '../assets/wellcome.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

const handleLogin = async (value) => {
  console.log('value', value);
  try{
    const data = await axios.get('http://192.168.54.1:3200/users/' + username)
      const response = await axios.post('http://192.168.54.1:3200/users/login', {
      username: value.username,
      password: value.password,
    })
    if (response.data.status == 200) {
      console.log('response', response.data)
      navigation.navigate('homepage')
      // AsyncStorge.setItem
      await AsyncStorage.setItem('password', value.password)
      await AsyncStorage.setItem('username', value.username)
      await AsyncStorage.setItem('nama', data.data.nama)
    }
  } catch (error){
    ToastAndroid.show('cek username dan password anda kembali')
  }
}


  return (
    <View style= {styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View>
        <TextInput 
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="black"
        onChangeText={(username) => setUserName(username)}
        value={username}
        />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        value={password}
        />
        <TouchableOpacity
         style={styles.button} 
         onPress={async () => {
            await handleLogin({ username, password });
         }}>
          <Text style={styles.textButtom}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't Have Acccount?<Text 
        style={{ fontWeight:'bold'}} 
        onPress={()=> navigation.navigate('register')}> Sign Up</Text></Text>
      </View>
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
    width: 200.63,
    height: 100.19,
    marginBottom: 20
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button:{
    flexDirection: 'row',
    width: 300,
    height: 50,
    backgroundColor: '#3ded0c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtom:{
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
})

export default App