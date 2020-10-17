import React from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

export default function OrphanageData() {
  return (
    <ScrollView style={ styles.container } contentContainerStyle={ { padding: 24 } }>
      <Text style={ styles.title }>Dados</Text>

      <Text style={ styles.label }>Nome</Text>
      <TextInput
        style={ styles.input }
      />

      <Text style={ styles.label }>Sobre</Text>
      <TextInput
        style={ [styles.input, { height: 110 }] }
        multiline
      />

      <Text style={ styles.label }>Whatsapp</Text>
      <TextInput
        style={ styles.input }
      />

      <Text style={ styles.label }>Fotos</Text>
      <TouchableOpacity style={ styles.imagesInput } onPress={ () => {} }>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={ styles.title }>Visitação</Text>

      <Text style={ styles.label }>Instruções</Text>
      <TextInput
        style={ [styles.input, { height: 110 }] }
        multiline
      />

      <Text style={ styles.label }>Horario de visitas</Text>
      <TextInput
        style={ styles.input }
      />

      <View style={ styles.switchContainer }>
        <Text style={ styles.label }>Atende final de semana?</Text>
        <Switch 
          thumbColor="#FFFFFF" 
          trackColor={ { false: '#CCCCCC', true: '#39CC83' } }
        />
      </View>

      <RectButton style={ styles.nextButton } onPress={ () => {} }>
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