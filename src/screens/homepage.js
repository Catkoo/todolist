import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Logo from '../assets/Logo.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Checkbox } from 'react-native-paper'

const App = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [datax, setDatax] = useState({
    id: '',
    username: '',
  })

  useEffect(() => {
    getData()
    getList()
    return () => { }
  }, [])

  const getList = async () => {
    axios
      .get(`http://192.168.54.1:3200/todo/${datax.id}`)
      .then(({ data }) => {
        console.log("data", data)
        setData(data)
      })
      .catch((error) => console.error(error))
  }

  const getData = async () => {
    try {
      const username = await AsyncStorage.getItem('username')
      const check = await axios.get(`http://192.168.54.1:3200/users/${username}`)

      if (username !== null) {
        setDatax({
          id: check.data.id,
          username: username,
        })
      }
    } catch (e) { }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Todo List Saya</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getList}
          />
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { flexDirection: 'row' }]}
              onPress={async () => {
                await AsyncStorage.setItem('title', item.title)

                navigation.navigate('edit')
              }}
            >
              <View style={[{ justifyContent: 'center', marginLeft: 16 }]}>
                <Text style={styles.titles}>{item.title}</Text>
                <Text style={styles.descs}>{item.desc}</Text>
                <Text style={styles.dates}>{item.date}</Text>
              </View>
              <View style={{ top: 28, right: 20, position: 'absolute' }}>
                <Checkbox
                  status={item.status ? 'checked' : 'unchecked'} color='green' size={20}
                  value={item.status}
                  onPress={async () => {
                    if (item.status == 0) {
                      await axios.put(`http://192.168.54.1:3200/todo/status/${item.id}`, { status: 1 })
                    } else {
                      await axios.put(`http://192.168.54.1:3200/todo/status/${item.id}`, { status: 0 })
                    }
                  }}
                />
              </View>
              <TouchableOpacity
                style={{ position: 'absolute', width: 100, height: 40, backgroundColor: 'red', right: 60, top: 30, justifyContent: 'center' }}
                onPress={async () => {
                  await axios.delete(`http://192.168.54.1:3200/todo/${item.id}`)
                }}>
                <Text style={[styles.hapus, { textAlign: 'center', color: '#fff' }]}>Hapus</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )
        }}
      />

      <TouchableOpacity
        style={{ right: 30, bottom: 30, position: 'absolute' }}
        onPress={() => navigation.navigate('tambah')}
      >
        <Text style={{color: 'black'}}>ADD</Text>
      </TouchableOpacity>
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },

  card: {
    backgroundColor: 'white',
    width: 312,
    height: 100,
    marginLeft: 24,
    marginBottom: 10,
  },

  titles: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    marginBottom: 6,
  },

  descs: {
    color: '#000',
    width: 200,
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    marginBottom: 10
  },

  dates: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  },

  hapus: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
  }
})

export default App