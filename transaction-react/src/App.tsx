import { ethers} from "ethers"
import { useRef } from 'react'

import { CheckoutOperationParams, Price } from '@rarimo/nft-checkout'
import { RarimoPayButton, DappContextProvider } from '@rarimo/react-nft-checkout'

// Address of the NFT sale contract
const NFT_CONTRACT_ADDRESS = "0x77fedfb705c8bac2e03aad2ad8a8fe83e3e20fa1"
// Buyer's address to send the bought NFT to
const USER_WALLET_ADDRESS = "0x0000000000000000000000000000000000000000"

const App = () => {

  // Set the price as 0.1 ETH and convert to wei
  const priceOfNft = Price.fromRaw('0.01', 18, 'ETH')

  const params:CheckoutOperationParams = {
    // Source chain
    chainIdFrom: 0,
    // Destination chain id (Sepolia in this case)
    chainIdTo: 11155111,
    recipient: USER_WALLET_ADDRESS,
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
