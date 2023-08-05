import { StyleSheet, Text } from 'react-native';
import { useParty } from './hooks/useParty';
import { PartySetup } from './components/PartySetup';
import { CreateParty } from './components/CreateParty';
import { createParty } from './fsdb/fsdb';

export default function App() {
  const [{ loading, party }, setParty] = useParty()

  const handleCreateParty = (creator: string) => {
    const newParty = createParty(creator)
    setParty(newParty)
  }

  if (loading) return <Text>Loading...</Text>

  return party ? <PartySetup party={party} onPartyChange={setParty}/> : <CreateParty onDone={handleCreateParty}/>
}
