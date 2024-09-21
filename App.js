import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { api } from './src/sevices/api';
import { useState, useRef } from 'react';

export default function App() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);

  const inputRef = useRef(null);

  async function buscar() {
    if (cep == '') {
      alert('Por favor digite um cep');
      setCep('');
      return;
    }
    try {
      console.log(cep);
      const url = `/${cep}/json/`;
      const response = await api.get(url);
      setCepUser(response.data);
      console.log("response", response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('erro no cep', error);
    }

  }

  function limpar() {
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput style={styles.input} placeholder='Ex: 00000000' ref={inputRef} value={cep} onChangeText={(text) => setCep(text)} keyboardType='numeric' />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={buscar} style={[styles.botao, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={limpar} style={[styles.botao, { backgroundColor: '#cd3e1d' }]}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>
            CEP: {cepUser?.cep}
          </Text>
          <Text style={styles.itemText}>
            Logradouro: {cepUser?.logradouro}
          </Text>
          <Text style={styles.itemText}>
            Bairro: {cepUser?.bairro}
          </Text>
          <Text style={styles.itemText}>
            Cidade: {cepUser?.localidade}
          </Text>
          <Text style={styles.itemText}>
            UF: {cepUser?.uf}
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    fontSize: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    height: 50,
    fontSize: 20,
    padding: 10,
    marginTop: 20
  },
  areaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    padding: 15,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  botaoText: {
    fontSize: 15,
    color: '#fff',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
  }
});
