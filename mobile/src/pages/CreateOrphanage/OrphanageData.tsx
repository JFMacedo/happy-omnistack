import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    console.log({
      latitude,
      longitude,
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${ index }.jpg`,
        type: 'image/jpg',
        uri: image
      } as any)
    });

    await api.post('orphanages', data);

    navigation.navigate('OrphanagesMap');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if(status !== 'granted') {
      alert('Precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if(result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image])
  }

  return (
    <ScrollView style={ styles.container } contentContainerStyle={ { padding: 24 } }>
      <Text style={ styles.title }>Dados</Text>

      <Text style={ styles.label }>Nome</Text>
      <TextInput
        style={ styles.input }
        value={ name }
        onChangeText={ setName }
      />

      <Text style={ styles.label }>Sobre</Text>
      <TextInput
        multiline
        style={ [styles.input, { height: 110 }] }
        value={ about }
        onChangeText={ setAbout }
      />

      {/* <Text style={ styles.label }>Whatsapp</Text>
      <TextInput
        style={ styles.input }
      /> */}

      <Text style={ styles.label }>Fotos</Text>

      <View style={ styles.uploadedImagesContainer }>
        { images.map(image => {
          return (
            <Image
              key={ image }
              source={ { uri: image } }
              style={ styles.uploadedImage }
            />
          );
        }) }
      </View>

      <RectButton style={ styles.imagesInput } onPress={ handleSelectImages }>
        <Feather name="plus" size={24} color="#15B6D6" />
      </RectButton>

      <Text style={ styles.title }>Visitação</Text>

      <Text style={ styles.label }>Instruções</Text>
      <TextInput
        multiline
        style={ [styles.input, { height: 110 }] }
        value={ instructions }
        onChangeText={ setInstructions }
      />

      <Text style={ styles.label }>Horario de visitas</Text>
      <TextInput
        style={ styles.input }
        value={ opening_hours }
        onChangeText={ setOpeningHours }
      />

      <View style={ styles.switchContainer }>
        <Text style={ styles.label }>Atende final de semana?</Text>
        <Switch 
          thumbColor="#FFFFFF" 
          trackColor={ { false: '#CCCCCC', true: '#39CC83' } }
          value={ open_on_weekends }
          onValueChange={ setOpenOnWeekends }
        />
      </View>

      <RectButton style={ styles.nextButton } onPress={ handleCreateOrphanage }>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 32,
    paddingBottom: 24,
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
    borderBottomWidth: 0.8,
    color: '#5C8599',
    borderBottomColor: '#D3E2E6'
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Nunito_600SemiBold',
    color: '#8FA7B3'
  },
  comment: {
    fontSize: 11,
    color: '#8FA7bB'
  },
  input: {
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    height: 56,
    textAlignVertical: 'top',
    borderWidth: 1.4,
    borderRadius: 20,
    borderColor: '#D3E2E6',
    backgroundColor: '#FFFFFF'
  },
  uploadedImagesContainer: {
    flexDirection: 'row'
  },
  uploadedImage: {
    width: 64,
    height: 64,
    marginBottom: 32,
    marginRight: 8,
    borderRadius: 20
  },
  imagesInput: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginBottom: 32,
    borderWidth: 1.4,
    borderStyle: 'dashed',
    borderRadius: 20,
    borderColor: '#96D2F0',
    backgroundColor: '#FFFFFF80'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginTop: 32,
    borderRadius: 20,
    backgroundColor: '#15C3D6'
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF'
  }
})