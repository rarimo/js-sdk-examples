import { MetamaskProvider } from '@rarimo/provider'
import { useProvider } from '@rarimo/react-provider'

function App() {
  const { provider } = useProvider(MetamaskProvider)

  provider?.connect()
  console.log(provider?.address)

  return <div className="App">Wallet address: {provider?.address}</div>
}

export default App