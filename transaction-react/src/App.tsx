import {ethers} from "ethers"

import {Price} from '@rarimo/nft-checkout'
import {RarimoPayButton, DappContextProvider} from '@rarimo/react-nft-checkout'
import {useProvider} from '@rarimo/react-provider'
import {MetamaskProvider} from '@rarimo/provider'
import {useEffect, useMemo} from "react";

const NFT_CONTRACT_ADDRESS = "0x77fedfb705c8bac2e03aad2ad8a8fe83e3e20fa1"

const App = () => {

  // Connect to the user's wallet
  const {provider} = useProvider(MetamaskProvider)

  useEffect(() => {
    const connectProvider = async () => {
      await provider?.connect()
    }
    connectProvider()
  }, []);


  // Set the price as 0.1 ETH and convert to wei
  const priceOfNft = Price.fromRaw('0.01', 18, 'ETH')

  const targetNft = useMemo(() => {
   return {
     // Source chain id (Sepolia in this case)
     chainId: 11155111,
     // NFT contract address
     address: NFT_CONTRACT_ADDRESS,
     // Recipient wallet address
     recipient: provider?.address ?? '',
     price: priceOfNft,
     // The token to swap the payment token to
     swapTargetTokenSymbol: 'WETH',
   }
  }, [provider?.address])


  const buildBundle = () => {
    // Encode the transaction
    const encodedFunctionData = new ethers.utils.Interface(["function buy(address receiver_) payable"])
      .encodeFunctionData("buy", [
        provider?.address!,
      ])

    console.log(priceOfNft)

    return ethers.utils.defaultAbiCoder.encode(
      // The Solidity types of the values in the second parameter
      ["address[]", "uint256[]", "bytes[]"],
      [
        [NFT_CONTRACT_ADDRESS],
        [priceOfNft.value],
        [encodedFunctionData],
      ]
    )
  }

  // Create the transaction bundle
  const checkoutTxBundle = useMemo(() => provider?.address ? buildBundle() : '', [provider?.address])

  return (
    <div className="app">
      {provider?.address && (<DappContextProvider
        targetNft={targetNft}
        checkoutTxBundle={checkoutTxBundle}
      >
        <RarimoPayButton/>
      </DappContextProvider>)}
    </div>
  )
}

export default App
