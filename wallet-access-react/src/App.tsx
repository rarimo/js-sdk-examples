import { MetamaskProvider } from '@rarimo/providers-evm'
import { useProvider } from '@rarimo/react-provider'
import { useEffect } from 'react'

function App() {
  const { provider } = useProvider(MetamaskProvider)

  useEffect(() => {
    const connectToProvider = async () => {
      await provider.connect()
    }
    if (!provider) connectToProvider()
    if (provider?.address) console.log(provider.address)
  }, [provider])

  return <div className="App">Wallet address: {provider?.address}</div>
}

export default App