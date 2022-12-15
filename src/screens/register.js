import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () =>{ 
  const [username, setUserName] = useState("")
  const [nama, setNama] = useState("")
  const [password, setPassword] = useState("")

  const register = async (value) => {
    console.log('value', value)

    try {
      const response = await axios.post('http://192.168.54.1:3200/users/', {
        username: value.username,
        nama: value.nama,
        password: value.password,
      })

      if (response.data.status == 200) {
        console.log('response', response.data)
        navigation.navigate('homepage')

        ToastAndroid.show("Berhasil Daftar", ToastAndroid.SHORT)
      }
    } catch (e) {
      ToastAndroid.show("Daftar Gagal", ToastAndroid.SHORT)
    }
  }
  const navigation = useNavigation();
    return (
      <View style= {styles.container}>
        <View>
          <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#000"
          onChangeText={(username) => setUserName(username)}
          value={username}
          />
          <TextInput
          style={styles.input}
          placeholder="Nama"
          placeholderTextColor="#000"
          onChangeText={(nama) => setNama(nama)}
          value={nama}
          />
          <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
          />
          <TouchableOpacity 
          style={styles.button}
          onPress={async () => {
            if (username == "" || nama == "" || password == "" ) {
              ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
            } else {
              register({ username, nama, password });
            }
            navigation.goBack()
            }}>
            <Text style={styles.textButtom}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Already Have An Acccount?<Text 
          style={{ fontWeight:'bold'}}> Sign In</Text></Text>
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
        width: 200,
        height: 200,
      },
      input: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        color: 'black',
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      button:{
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
      },
      text: {
        marginTop: 20,
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
      },
})
export default App