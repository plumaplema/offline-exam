import { useState } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, TextInput } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { Assessment, Choice } from './Interfaces';
import * as FileSystem from 'expo-file-system';
import CryptoES from 'crypto-es';

export interface Question_with_Answer {
  id: number;
  userAnswer?: string;
  userisCorrect?: boolean;
  question: string;
  question_type: 'mult' | 'ident';
  choices: Array<Choice>;
  index: number;
  answer?: Choice;
}

export interface Assessment_with_Answer {
  id: number;
  key: string;
  subject: number;
  name: string;
  date: string;
  questions: Array<Question_with_Answer>;
}

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackScreenProps;
}) {
  const [filename, setFileName] = useState('Choose File');

  const [key, setKey] = useState('');

  const [result, setResult] = useState<string>('');

  const handleFile = async () => {
    const pick = await DocumentPicker.getDocumentAsync();
    const { type } = pick;

    if (type == 'success') {
      const { name, uri } = pick;
      if (name.includes('gpl')) {
        setFileName(pick.name);
        const text = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        setResult(text);
      } else {
        alert('Wrong File Extension');
      }
    }
  };

  const decrypt = async () => {
    try {
      var bytes = CryptoES.AES.decrypt(result, key);
      var decryptedData: Assessment = JSON.parse(
        bytes.toString(CryptoES.enc.Utf8)
      );
      const questions = decryptedData.questions;
      const modified_questions = questions.map((question) => {
        const choices = question.choices;
        const correct_choice = choices.filter((choice) => {
          return choice.isCorrect;
        });
        const final: Question_with_Answer = {
          ...question,
          answer: correct_choice[0],
          userAnswer: '',
        };
        return final;
      });
      const final_data: Assessment_with_Answer = {
        ...decryptedData,
        questions: modified_questions,
      };
      navigation.navigate('Profile', final_data);
    } catch {
      alert('Wrong Assessment Key');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        icon
        style={{ margin: 5, width: '80%' }}
        mode="contained"
        onPress={() => handleFile()}>
        {filename}
      </Button>
      <TextInput
        style={{ margin: 4, width: '80%' }}
        value={key}
        onChangeText={(text: string) => setKey(text)}
        label="Assessment Key"
      />
      <Button
        disabled={!result}
        style={{ margin: 5, width: '80%' }}
        mode="contained"
        onPress={() => decrypt()}
        color={'green'}>
        Generate Questions
      </Button>
    </View>
  );
}
