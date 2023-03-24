import { useRef } from 'react'
import { ethers } from "ethers"

import { Price, Target } from '@rarimo/nft-checkout'
// @ts-ignore
import { RarimoPayButton, DappContextProvider } from '@rarimo/react-nft-checkout'
import { useProvider } from '@rarimo/react-provider'
import { MetamaskProvider } from '@rarimo/provider'

const NFT_CONTRACT_ADDRESS = "0x77fedfb705c8bac2e03aad2ad8a8fe83e3e20fa1"

const App = () => {

  // Connect to the user's wallet
  const { provider, address } = useProvider(MetamaskProvider)

  provider?.connect()

  // Set the price as 0.1 ETH and convert to gwei
  const priceOfNft = Price.fromRaw('0.01', 18, 'ETH')

  const targetNft = useRef<Target>({
    // Source chain id (Sepolia in this case)
    chainId: 11155111,
    // NFT contract address
    address: NFT_CONTRACT_ADDRESS,
    // Recipient wallet address
    recipient: address!,
    price: priceOfNft,
    // The token to swap the payment token to
    swapTargetTokenSymbol: 'WETH',
  })

  // Encode the transaction
  const encodedFunctionData = new ethers.utils
    .Interface(["function buy(address receiver_) payable"])
    .encodeFunctionData("buy", [
        address!,
    ])

  // Create the transaction bundle
  const checkoutTxBundle = ethers.utils.defaultAbiCoder.encode(
    // The Solidity types of the values in the second parameter
    ["address[]", "uint256[]", "bytes[]"],
    [
      [NFT_CONTRACT_ADDRESS],
      [priceOfNft],
      [encodedFunctionData],
    ]
  )

  return (
    <div className="app">
      <DappContextProvider
        targetNft={targetNft}
        checkoutTxBundle={checkoutTxBundle}
      >
        <RarimoPayButton />
      </DappContextProvider>
    </div>
  )
}

export default App
