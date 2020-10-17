import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../../src/images/map-marker.png';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={ styles.container }>
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.map }
        initialRegion={ {
          latitude: -23.0505361,
          longitude: -50.230249,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        } }
      >
        <Marker
          icon={ mapMarker }
          calloutAnchor={ {
            x: 2.7,
            y: 0.8
          } }
          coordinate={ {
            latitude: -23.0505361,
            longitude: -50.230249,
          } }
        >
          <Callout tooltip onPress={ handleNavigationToOrphanageDetails }>
            <View style={ styles.calloutContainer }>
              <Text style={ styles.calloutText }>Lar das Meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={ styles.footer }>
          <Text style={ styles.footerText }>2 orfanatos ancontrados</Text>
          <TouchableOpacity style={ styles.createOrphanageButton } onPress={ () => {} }>
            <Feather name='plus' size={ 20 } color='#FFFFFF' />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    justifyContent: 'center',
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFFCC'
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: '#0089A5'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 3
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3'
  },
  createOrphanageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#15C3D6'
  }
});