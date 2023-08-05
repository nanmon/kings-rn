import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useParty } from './hooks/useParty';
import { PartySetup } from './components/PartySetup';
import { CreateParty } from './components/CreateParty';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Monocraft': require('./assets/Monocraft.otf')
  })
  const [{ loading, party }, setParty] = useParty()

  if (loading || !fontsLoaded) return <Text>Loading...</Text>

  return party 
    ? <PartySetup party={party} onPartyChange={setParty}/> 
    : <CreateParty onDone={setParty}/>
}
