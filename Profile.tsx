import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Assessment_with_Answer, Question_with_Answer } from './HomeScreen';
import CryptoES from 'crypto-es';
import { Choice } from './Interfaces';
import { Multi } from './Multi';

export default function Profile({ navigation, route }: NativeStackScreenProps) {
  const data: Assessment_with_Answer = route.params;

  const { questions } = data;

  const [questionwithanswer, setquestionwithanswer] =
    useState<Assessment_with_Answer>(data);

  const [name, setName] = useState<{ first: string; last: string }>({
    first: '',
    last: '',
  });

  const validate_name = () => {
    const first_name = name.first;
    const last_name = name.last;
    return first_name == '' || last_name == '';
  };

  const count_score = async () => {
    const { questions } = questionwithanswer;
    for (const x of questions) {
      if (x.userAnswer == '') {
        alert(`Answer ${x.question}`);
        return false;
      }
    }
    const correct_answer = questions.filter((question) => {
      return question.userisCorrect;
    });
    const unlock_key = Math.floor(Math.random() * 10000);
    const fileData = JSON.stringify({
      first_name: name.first,
      last_name: name.last,
      score: correct_answer.length,
      unlock_key,
      total: questions.length,
    });
    var ciphertext = CryptoES.AES.encrypt(fileData, 'loyogoy').toString();
    navigation.navigate('Result', { data: ciphertext, questionwithanswer, unlock_key: unlock_key.toString() });
  };

  const submit = async () => {
    const invalid_name = validate_name();
    if (invalid_name) {
      alert('You need to fill up both first and last name');
      return false;
    }
    await count_score();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          outlineColor="green"
          style={{ marginTop: 10, width: '90%', backgroundColor: '#abdbe3' }}
          label="First Name"
          onChangeText={(ans: string) => setName({ ...name, first: ans })}
        />
        <TextInput
          onChangeText={(ans: string) => setName({ ...name, last: ans })}
          style={{ margin: 4, width: '90%', backgroundColor: '#abdbe3' }}
          label="Last Name"
        />

        <Text style={{ fontSize: 20, margin: 5 }}>Questions</Text>
        {questions.map((e, index) => {
          const { question, choices, answer, question_type } = e;
          const { text } = answer as Choice;
          if (question_type == 'ident') {
            return (
              <View style={styles.inputstyle}>
                <Text style={{ textAlign: 'left' }} variant="headlineLarge">
                  {`${index + 1}.)    ${question}`}
                </Text>
                <TextInput
                  onChangeText={(t: string) => {
                    const dup = questionwithanswer;
                    const modified: Question_with_Answer = {
                      ...e,
                      userisCorrect:
                        t.toLocaleLowerCase() == text.toLocaleLowerCase(),
                      userAnswer: t,
                    };
                    dup.questions[index] = modified;
                    setquestionwithanswer(dup);
                  }}
                  label={`Type your answer`}
                  style={{
                    margin: 2,
                    width: '100%',
                    backgroundColor: '#abdbe3',
                  }}
                />
              </View>
            );
          } else {
            return (
              <View style={styles.inputstyle}>
                <Text style={{ textAlign: 'left' }} variant="headlineLarge">
                  {`${index + 1}.)    ${question}`}
                </Text>
                <Multi
                  onChange={(value: string) => {
                    const dup = questionwithanswer;
                    const modified: Question_with_Answer = {
                      ...e,
                      userisCorrect:
                        value.toLocaleLowerCase() == text.toLocaleLowerCase(),
                      userAnswer: value,
                    };
                    dup.questions[index] = modified;
                    setquestionwithanswer(dup);
                  }}
                  choices={choices}
                />
              </View>
            );
          }
        })}
      </View>
      <Button
        onPress={() => submit()}
        style={{ margin: 10, width: '100%' }}
        mode="contained">
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 1,
    backgroundColor: 'white',
  },
  inputstyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 1,
    borderColor: '#1e81b0',
    borderWidth: 1,
    shadowColor: 'black',
  },
});
