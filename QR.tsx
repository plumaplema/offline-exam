import SvgQRCode from 'react-native-qrcode-svg';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Assessment_with_Answer } from './HomeScreen';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';

export default function QR({ navigation, route }: NativeStackScreenProps) {
  const {data, questionwithanswer,unlock_key
  }: { data: string; questionwithanswer: Assessment_with_Answer, unlock_key:string } =
    route.params;
  let logoFromFile = require('./assets/logo.png');

  const [key, setKey] = useState<string>();

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 20, margin: 5 }}>
          {questionwithanswer.name}
        </Text>
        <Text style={{ fontSize: 20, margin: 5 }}>SCAN RESULT</Text>
        {/* The logo doesn't display on Expo Web */}
        <SvgQRCode
          size={300}
          value={data}
          logoMargin={20}
          logoBorderRadius={100}
          logoSize={100}
          logo={logoFromFile}
        />
      </View>
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <TextInput
          label={`Unlock Code`}
          onChangeText={(text:string)=> setKey(text)}
          style={{
            margin: 8,
            width: '50%',
            backgroundColor: '#abdbe3',
          }}
        />

        <Button
          disabled={!key}
          onPress={()=>{
            if (unlock_key == key){
              navigation.navigate("Answer Key", {data: questionwithanswer})
            }else{
              alert("Wrong Unlock Key")
            }
          }}
          style={{ margin: 5, width: '80%' }}
          mode="contained"
          color={'green'}>
          Check Answer Key
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
