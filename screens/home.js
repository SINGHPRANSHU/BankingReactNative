import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';

function Home() {
  return (
    <View style = { styles.container }>
      <Text style = { styles.header }> Banking System </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center'
  },
  header: {
    fontSize: 20
  }
})

export default Home;
