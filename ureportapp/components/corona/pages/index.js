//import {createGlobalStyle} from 'styled-components';
// import useStats from '../utils/useStats';
import React from 'react';
import Stats from '../components/Stats';
import CountrySelector from '../components/CountrySelector';
import {View} from 'react-native';

export default function IndexPage() {
  return (
    <View>
      <Stats url="https://covid19.mathdro.id/api"></Stats>
      <CountrySelector />
    </View>
  );
}
