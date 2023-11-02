import { ethers} from 'ethers'
import { useRef, useEffect } from 'react'

import { CheckoutOperationParams, Price } from '@rarimo/nft-checkout'
import { RarimoPayButton, DappContextProvider } from '@rarimo/react-nft-checkout'
import { MetamaskProvider } from '@rarimo/providers-evm'
import { useProvider } from '@rarimo/react-provider'

// Address of the NFT sale contract
const NFT_CONTRACT_ADDRESS = "0x22d6A6946874F8Df79Bc9574e4cB72729c2d0c75"

const App = () => {

  // Get the user's wallet information
  const { provider } = useProvider(MetamaskProvider)
  useEffect(() => {
    const connectToProvider = async () => {
      await provider.connect()
    }
    if (!provider) connectToProvider()
  }, [provider])

  // Set the price as 0.1 ETH and convert to wei
  const priceOfNft = Price.fromRaw('0.01', 18, 'tBNB')

  const params:CheckoutOperationParams = {
    // Source chain: Goerli
    chainIdFrom: 5,
    // Destination chain: Chapel
    chainIdTo: 97,
    recipient: provider?.address,
    price: priceOfNft,
  }

  const createCheckoutTransactionBundle = useRef((recipient: string) => {
    const encodedFunctionData = new ethers.utils.Interface([
      'function buy(address receiver_) payable',
    ]).encodeFunctionData('buy', [recipient])

    return ethers.utils.defaultAbiCoder.encode(
      ['address[]', 'uint256[]', 'bytes[]'],
      [[NFT_CONTRACT_ADDRESS], [priceOfNft], [encodedFunctionData]],
    )
  }).current

  return (
    <div className="app">
      <DappContextProvider
        params={params}
        createCheckoutTransactionBundleCb={createCheckoutTransactionBundle}
      >
        <RarimoPayButton />
      </DappContextProvider>
    </div>
  )
}

export default App
