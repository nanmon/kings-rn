import { useFonts } from 'expo-font';
import { useParty } from './hooks/useParty';
import { PartySetup } from './components/PartySetup';
import { CreateParty } from './components/CreateParty';
import { createParty } from './fsdb/fsdb';
import { Text } from './components/Text';
import { Div } from './components/Div';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Monocraft': require('./assets/Monocraft.otf')
  })
  const [{ loading, party }, setParty] = useParty()

  const handleCreateParty = (creator: string) => {
    const newParty = createParty(creator)
    setParty(newParty)
  }

  if (loading || !fontsLoaded) return (
    <Div>
      <Text>Loading...</Text>
    </Div>
  )

  return party ? <PartySetup party={party} onPartyChange={setParty}/> : <CreateParty onDone={handleCreateParty}/>
}
