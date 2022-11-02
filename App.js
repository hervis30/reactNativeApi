import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sid, setSid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  console.log("corriendo aplicacion");

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUsersById = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const json = await response.json();
      setData(json);
      //chequear si encontro el id
      if (json.name != null) {
        setName(json.name);
        setEmail(json.email);
      } else {
        alert(`El id ${id} no existe. Intentelo con otro`)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //getUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity style={[styles.buttons, { backgroundColor: 'blue' }]}
        onPress={getUsers}
      >
        <Text style={{ color: 'black' }}>listar usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttons, { backgroundColor: 'blue' }]}
        onPress={() => getUsersById(sid)}
      >
        <Text style={{ color: 'black' }}>Buscar por id</Text>
      </TouchableOpacity>

      <TextInput style={styles.inputs}
        placeholder="Ingrese el id del usuario"
        //onChangetex debe ser onChangeText, pq es String
        onChangeText={sid => setSid(sid)}
        value={sid}

      >
      </TextInput>
      <TextInput style={styles.inputs}
        value={name}
      >
      </TextInput>
      <TextInput style={styles.inputs}
        value={email}
      >
      </TextInput>


      {isLoading ? <ActivityIndicator size="large" color="red" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: item.id % 2 == 0 ? 'orange' : 'gray' }]}
              onPress={() => {
                //alert(item.username);
                if (confirm(`Esta seguro de borrar el usuario ${item.name} ?`)) {
                  alert("Borrado");
                }

              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}, {item.email}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    textAlign: 'center',
    marginTop: 5,
    height: 40
  }
});
export default App;
