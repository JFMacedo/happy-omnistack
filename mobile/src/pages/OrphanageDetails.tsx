import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import mapMarkerImg from '../images/map-marker.png';
import api from '../services/api';

interface OrphanateDetailsRouteParams {
  id: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array <{
    id: number;
    url: string;
  }>
}

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const params = route.params as OrphanateDetailsRouteParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(res => {
      setOrphanage(res.data);
    });
  }, [params.id]);

  if(!orphanage) {
    return (
      <View style={ styles.container }>
        <Text style={ styles.description }>Carregando...</Text>
      </View>
    );
  }

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${ orphanage?.latitude },${ orphanage?.longitude }`)
  }

  return (
    <ScrollView style={ styles.container }>
      <View style={ styles.imagesContainer }>
        <ScrollView horizontal pagingEnabled>
          { orphanage.images.map(image => {
            return(
              <Image key={ image.id } style={ styles.image } source={ { uri: image.url } } />
            );
          }) }
        </ScrollView>
      </View>

      <View style={ styles.detailsContainer }>
        <Text style={ styles.title }>{ orphanage.name }</Text>
        <Text style={ styles.description }>{ orphanage.about }</Text>
      
        <View style={ styles.mapContainer }>
          <MapView 
            initialRegion={ {
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={ false }
            pitchEnabled={ false }
            scrollEnabled={ false }
            rotateEnabled={ false }
            style={ styles.mapStyle }
          >
            <Marker 
              icon={ mapMarkerImg }
              coordinate={ {
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              } }
            />
          </MapView>

          <RectButton onPress={ handleOpenGoogleMapsRoutes } style={ styles.routesContainer }>
            <Text style={ styles.routesText }>Ver rotas no Google Maps</Text>
          </RectButton>
        </View>
      
        <View style={ styles.separator } />

        <Text style={ styles.title }>Instruções para visita</Text>
        <Text style={ styles.description }>{ orphanage.instructions }</Text>

        <View style={ styles.scheduleContainer }>
          <View style={ [styles.scheduleItem, styles.scheduleItemBlue] }>
            <Feather name="clock" size={ 40 } color="#2AB5D1" />
            <Text style={ [styles.scheduleText, styles.scheduleTextBlue] }>
              Segunda à Sexta { orphanage.opening_hours }
            </Text>
          </View>

          { orphanage.open_on_weekends ? (
            <View style={ [styles.scheduleItem, styles.scheduleItemGreen] }>
              <Feather name="info" size={ 40 } color="#39CC83" />
              <Text style={ [styles.scheduleText, styles.scheduleTextGreen] }>Atendemos fim de semana</Text>
            </View>
          ) : (
            <View style={ [styles.scheduleItem, styles.scheduleItemRed] }>
              <Feather name="info" size={ 40 } color="#FF669D" />
              <Text style={ [styles.scheduleText, styles.scheduleTextRed] }>Não atendemos fim de semana</Text>
            </View>
          ) }

        </View>

        {/* <RectButton style={ styles.contactButton } onPress={ () => {} }>
          <FontAwesome name="whatsapp" size={ 24 } color="#FFFFFF" />
          <Text style={ styles.contactButtonText }>Entrar em contato</Text>
        </RectButton> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagesContainer: {
    height: 240
  },
  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover'
  },
  detailsContainer: {
    padding: 24
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    color: '#4D6F80'
  },
  description: {
    marginTop: 16,
    fontFamily: 'Nunito_600SemiBold',
    lineHeight: 24,
    color: '#5C8599'
  },
  mapContainer: {
    marginTop: 40,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderRadius: 20,
    borderColor: '#B3DAE2',
    backgroundColor: '#E6F7FB'
  },
  mapStyle: {
    width: '100%',
    height: 150
  },
  routesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089A5'
  },
  separator: {
    width: '100%',
    height: 0.8,
    marginVertical: 40,
    backgroundColor: '#D3E2E6'
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24
  },
  scheduleItem: {
    width: '48%',
    padding: 20
  },
  scheduleItemBlue: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B3DAE2',
    backgroundColor: '#E6F7FB'
  },
  scheduleItemGreen: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#A1E9C5',
    backgroundColor: '#EDFFF6'
  },
  scheduleItemRed: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFBCD4',
    backgroundColor: '#FCF0F4'
  },
  scheduleText: {
    marginTop: 20,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24
  },
  scheduleTextBlue: {
    color: '#5C8599'
  },
  scheduleTextGreen: {
    color: '#37C77F'
  },
  scheduleTextRed: {
    color: '#FF669D'
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: '#3CDC8C'
  },
  contactButtonText: {
    marginLeft: 16,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF'
  }
});