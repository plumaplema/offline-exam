import * as React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Choice } from './Interfaces';

export const Multi = ({
  choices,
  onChange,
}: {
  choices: Array<Choice>;
  onChange: (value: string) => void;
}) => {
  const [checked, setChecked] = React.useState('');

  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return (
    <View>
      {choices.map((choice, index) => {
        return (
          <View
            style={{
              margin: 2,
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <RadioButton
              value={choice.text}
              status={checked === choice.text ? 'checked' : 'unchecked'}
              onPress={() => setChecked(choice.text)}
            />
            <Text style={{ color: '#063970', letterSpacing: 4 }}>
              {choice.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
