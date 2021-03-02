import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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
  const [arsInput, setInputArs] = useState(0);

  useEffect(() => {
    alert(Number(dolarBlue?.compra))
    setUsdToArs(arsInput * Number(dolarBlue?.compra));
  }, [arsInput])

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
        <Text>Si tengo </Text><TextInput
          style={{ height: 40, width: 80, borderColor: 'gray', borderWidth: 1 }}
          value={arsInput}
          onChange={value => setInputArs(value)}
          keyboardType="numeric"
        />

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

