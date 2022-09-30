import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnswerKey from './AnswerKey';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import QR from './QR'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Offline Exam" component={HomeScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Result" component={QR} />
        <Stack.Screen name="Answer Key" component={AnswerKey} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
