import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ImageBackground, StatusBar,Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const App = () => {
  const navigation = useNavigation();

  const [username, setUserName] = useState('')
  const [nama, setNama] = useState('')
  const [passwordLama, setPasswordLama] = useState('')
  const [passwordBaru, setPasswordBaru] = useState('')
  const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

  const [data, setData] = useState({
    username: '',
    password: '',
    nama: ''
  })

  console.log('username', data.username)
  console.log('password', data.password);
  console.log('nama', data.nama);

  useEffect(() => {
    getData()
    return () => { };
  }, []);

  const getData = async () => {
    try {
      let username = await AsyncStorage.getItem('username')
      let password = await AsyncStorage.getItem('password')
      let nama = await AsyncStorage.getItem('nama')
      if (username !== null) {
        // value previously stored
        setData({
          username: username,
          nama: nama,
          password: password,
          nama: nama
        })
      }
    } catch (e) {
      // error reading value
    }
  }
  const resetPassword = async (value) => {
    console.log('value', value);
    try {
      const response = await axios.put('http://192.168.54.1:3200/users', {
        username: value.username,
        password: value.passwordLama,
        passwordBaru: value.passwordBaru,
      })
      if (response.data.status == 200) {
        console.log('response', response)
        ToastAndroid.show("Password berhasil diubah", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error.message)
      ToastAndroid.show("Cek kembali nip dan password", ToastAndroid.SHORT)
    }
  }

  return (
    <View style={{flex: 1, backgroundColor:'#00ffff'}}>
    <StatusBar barStyle={'light-content'} backgroundColor="#212121" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        }}
        style={{flex: 1}}
        resizeMode={'cover'}>
      </ImageBackground>
      <View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 3,
              borderColor: '#FFFFFF',
              position: 'absolute',
              zIndex: 2,
            }}
          />
      </View>
      </View>

      <View style={{marginTop: 60}}>
      <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#212121',
      }}>{data.nama}</Text>
      
      <Text style={{textAlign: 'center', color:'black'}}>
       Username: {data.username}</Text>
    </View>

    <View>
      <ScrollView>
    <Text>UserName</Text>
    <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        onChangeText={(username) => setUserName(username)}
        value={username}
      />
        {/* <Text>Nama</Text> 
       <TextInput
        style={styles.input}
        placeholder="Nama"
        placeholderTextColor="#fff"
        onChangeText={(nama) => setNama(nama)}
        value={nama}
      /> */}
      <Text>Password Lama</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password Lama"
        placeholderTextColor="white"
        secureTextEntry={true}
        onChangeText={(password) => setPasswordLama(password)}
        value={passwordLama}
      />
      <Text>Password Baru</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Password Baru"
        placeholderTextColor="white"
        secureTextEntry={true}
        onChangeText={(password) => setPasswordBaru(password)}
        value={passwordBaru}
      />
      <Text>Konfirmasi Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        onChangeText={(password) => setKonfirmasiSandi(password)}
        value={konfirmasiSandi}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (username == "" || passwordLama == "" || passwordBaru == "" || konfirmasiSandi == "") {
            ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
          } else if (username !== data.username || passwordLama !== data.password) {
            ToastAndroid.show('username atau Password Salah', ToastAndroid.SHORT);
          } else if (passwordBaru !== konfirmasiSandi) {
            ToastAndroid.show('Password Baru dan Konfirmasi Password Tidak Sama', ToastAndroid.SHORT);
          } else {
            resetPassword({ username: username, passwordLama: passwordLama, passwordBaru: passwordBaru })
          }
        }}>
        <Text style={styles.textButton}>Reset Password</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginStart: 30
    },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#047d06',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 45,
    marginTop: 15
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
})

export default App