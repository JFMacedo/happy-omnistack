import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('orphanages').then(res => {
      setOrphanages(res.data);
    });
  }, []);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
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
        { orphanages.map(orphanage => {
          return(
            <Marker
              key={ orphanage.id }
              icon={ mapMarker }
              calloutAnchor={ {
                x: 2.7,
                y: 0.8
              } }
              coordinate={ {
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              } }
            >
              <Callout tooltip onPress={ () => handleNavigateToOrphanageDetails(orphanage.id) }>
                <View style={ styles.calloutContainer }>
                  <Text style={ styles.calloutText }>{ orphanage.name }</Text>
                </View>
              </Callout>
            </Marker>
          );
        }) }
      </MapView>

      <View style={ styles.footer }>
          <Text style={ styles.footerText }>{ orphanages.length } orfanatos ancontrados</Text>
          <RectButton style={ styles.createOrphanageButton } onPress={ handleNavigateToCreateOrphanage }>
            <Feather name='plus' size={ 20 } color='#FFFFFF' />
          </RectButton>
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
    height: Dimensions.get('screen').height,
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
    bottom: 12,
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