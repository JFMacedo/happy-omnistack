import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData');
  }

  return (
    <View style={ styles.container }>
      <MapView 
        initialRegion={ {
          latitude: -23.0505361,
          longitude: -50.230249,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        } }
        style={ styles.mapStyle }
      >
        <Marker 
          icon={ mapMarkerImg }
          coordinate={ {
            latitude: -23.0505361,
            longitude: -50.230249
          } }
        />
      </MapView>

      <RectButton style={ styles.nextButton } onPress={ handleNextStep }>
        <Text style={ styles.nextButtonText }>Próximo</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height
  },
  nextButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6'
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF'
  }
})