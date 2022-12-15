import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Logo from '../assets/Logo.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Edit = () => {
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')

  const [data, setData] = useState({
    title: '',
  })

  useEffect(() => {
    getData()
    return () => { }
  }, [])

  const getData = async () => {
    try {
      const title = await AsyncStorage.getItem('title')
      const response = await axios.get(`http://192.168.54.1:3200/todo/update/${title}`)

      if (title !== null) {
        setData({
          title: title,
          desc: response.data.desc,
          date: response.data.date,
        })
      }
    } catch (e) {
      // error reading value
    }
  }

  const tambah = async (value) => {
    console.log('value', value)

    try {
      const response = await axios.put('http://192.168.54.1:3200/todo/', {
        title: data.title,
        desc: value.desc,
        date: value.date,
      })

      if (response.data.status == 200) {
        console.log('response', response.data)
        navigation.replace('Dashboard')
        ToastAndroid.show("Successful update todo", ToastAndroid.SHORT)
      }
    } catch (e) {
      ToastAndroid.show("Failed update todo", ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
       <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Ubah Todo</Text>

      <Text style={styles.label}>Judul</Text>
      <View style={styles.center}>
        <TextInput
          style={[styles.input]}
          placeholder='Enter your title'
          placeholderTextColor='#000'
          onChangeText={(title) => setTitle(title)}
          value={data.title}
        />
      </View>

      <Text style={styles.label}>Deskripsi</Text>
      <View style={styles.center}>
        <TextInput
          style={[styles.input]}
          placeholder='Masukkan Deskripsi'
          placeholderTextColor='#000'
          onChangeText={(desc) => setDesc(desc)}
          value={desc}
        />
      </View>

      <Text style={styles.label}>Tanggal</Text>
      <View style={styles.center}>
        <TextInput
          style={[styles.input]}
          placeholder='Masukkan Tanggal'
          placeholderTextColor='#000'
          onChangeText={(date) => setDate(date)}
          value={date}
        />
      </View>

      <View style={styles.center}>
        <TouchableOpacity
          style={styles.btn_submit}
          onPress={async () => {
            if (desc == '' || date == '') {
              ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT)
            } else {
              tambah({ desc: desc, date: date })
            }
          }}
        >
          <Text style={styles.txt_submit}>UBAH</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff',
  },

  logo:{
    width: 100.63,
    height: 100.19,
    marginLeft: 150,
    marginTop: 20
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    top: 40,
    marginBottom: 40,
    marginLeft: 50,
  },

  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    marginLeft: 50,
    marginTop: 25,
    marginBottom: 8,
  },

  input: {
    color: '#000',
    borderColor: '#000',
    width: 300,
    height: 50,
    fontSize: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
  },

  btn_submit: {
    backgroundColor: "#3ded0c",
    alignItems: "center",
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 53,
  },

  txt_submit: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    padding: 9,
    top: 5
  },

  txt_signin: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    marginTop: 16,
  },
})

export default Edit