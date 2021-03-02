import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UseLessTextInput from './src/components/UseLessTextInput';

const DOLAR_API = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

const getDolarNormalizedByType = (data, type) => {
  const normalizedData = [];
  data.forEach(value => normalizedData.push(value['casa']))
  return normalizedData[type];
}

const TYPE_OF_DOLAR = {
  oficial: 0,
  blue: 1,
}

const App = () => {
  const [dolarBlue, setDolarBlue] = useState(null);
  const [dolarOficial, setDolarOficial] = useState(null);
  const [usdToArs, setUsdToArs] = useState(0);
  const inputRef = useRef(0);

  useEffect(() => {
    const arsCurrency = inputRef?.current?.value;
    console.log(inputRef)
    if (arsCurrency) setUsdToArs(arsCurrency * dolarBlue);
  }, [])

  useEffect(() => {
    async function fetchData() {
      await fetch(DOLAR_API)
        .then(response => response.json())
        .then(data => {
          setDolarOficial(getDolarNormalizedByType(data, TYPE_OF_DOLAR.oficial))
          setDolarBlue(getDolarNormalizedByType(data, TYPE_OF_DOLAR.blue))
        });
    }
    fetchData()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dolar Oficial</Text>
      <Text>Compra: ${dolarOficial?.compra}</Text>
      <Text>Venta: ${dolarOficial?.venta}</Text>
      <Text>Dolar Blue</Text>
      <Text>Compra: ${dolarBlue?.compra}</Text>
      <Text>Venta: ${dolarBlue?.venta}</Text>
      <View>
        <Text>Si tengo </Text><UseLessTextInput ref={inputRef} keyboardType="numeric" />

        <Text>dolares, vendidos a Dolar blue son</Text>
        <Text>{usdToArs.toString()}</Text>
        <Text>pesos Argentinos</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

