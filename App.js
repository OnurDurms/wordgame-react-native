/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState,useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Grid from './src/components/Grid';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
         <Grid />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default App;
