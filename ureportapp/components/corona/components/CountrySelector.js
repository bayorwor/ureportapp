import React, {useState, useEffect} from 'react';
import useStats from '../utils/useStats';
import Stats from './Stats';
import {View, Picker, Text} from 'react-native';

export default function CountrySelector() {
  const {stats: countries, loading, error} = useStats(
    'https://covid19.mathdro.id/api/countries',
  );

  const [selectedCountry, setSelectedCountry] = useState('GH');

  if (loading) return <Text>Loading...</Text>;
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Currently Showing {selectedCountry}</Text>
        <Picker
          selectedValue={selectedCountry}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCountry(itemValue)
          }>
          {countries.countries.map((country) => {
            return (
              <Picker.Item
                key={`${country.iso3}`}
                label={`${country.name}`}
                value={`${country.iso3}`}
              />
            );
          })}
        </Picker>
      </View>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}></Stats>
    </View>
  );
}
