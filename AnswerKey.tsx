import SvgQRCode from 'react-native-qrcode-svg';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Assessment_with_Answer } from './HomeScreen';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';

const Question = ({
  question,
  isCorrect,
  userAnswer,
  correct_answer,
}: {
  question: string;
  isCorrect: boolean;
  userAnswer: string;
  correct_answer: string;
}) => {
  if (isCorrect) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          marginTop: 5 ,
          padding: 5,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: '#277315',
          borderWidth: 2,
          shadowColor: 'black',
        }}>
        <Text style={{ color: 'black', fontSize: 20 }}> ✔️ {question}</Text>
        <Text style={{ color: 'black', fontSize: 15 }}>
          Your Answer : {userAnswer}
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          marginTop: 5,
          padding: 5,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: '#C55A44',
          borderWidth: 2,
          shadowColor: 'black',
        }}>
        <Text style={{ color: 'black', fontSize: 20 }}> ✖️ {question}</Text>
        <Text style={{ color: 'black', fontSize: 15 }}>
          Your Answer : {userAnswer}
        </Text>
        <Text style={{ color: 'black', fontSize: 15 }}>
          Correct Answer : {correct_answer}
        </Text>
      </View>
    );
  }
};

export default function AnswerKey({
  navigation,
  route,
}: NativeStackScreenProps) {
  const { data }: { data: Assessment_with_Answer } = route.params;
  const { name, questions } = data;
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#063970', letterSpacing: 4, fontSize: 30 }}>
          {data.name}
        </Text>
        {questions.map((question_, index) => {
          const { question, userisCorrect, userAnswer, answer } = question_;

          return (
            <Question
              question={question}
              isCorrect={userisCorrect as boolean}
              userAnswer={userAnswer as string}
              correct_answer={answer ? answer.text : 'NONE'}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  ques: {
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
