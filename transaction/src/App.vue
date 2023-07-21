<script setup lang='ts'>
import { ChainNames, BridgeChain } from '@rarimo/shared'
import {
  createCheckoutOperation,
  EVMOperation,
  CheckoutOperationParams,
  Price,
  CheckoutOperation,
  PaymentToken,
} from '@rarimo/nft-checkout'
import { createProvider } from '@rarimo/provider'
import { MetamaskProvider } from '@rarimo/providers-evm'
import { ethers } from "ethers"
import { computed, ref, toRaw } from 'vue'

// Address of the NFT sale contract
// const NFT_CONTRACT_ADDRESS = "0x77fedfb705c8bac2e03aad2ad8a8fe83e3e20fa1"

// Chains to use
const chains = ref<BridgeChain[]>()
const sourceChainName = ChainNames.Goerli
const destinationChainName = ChainNames.Goerli // Sepolia is gone?

// Token to accept payment in
// const paymentToken = "UNI"

const sourceTxUrl = ref('')
const destinationTxUrl = ref('')
const op = ref<CheckoutOperation>()

const sendTransaction = async () => {
  // Connect to the Metamask wallet in the browser, using the MetamaskProvider interface to limit bundle size.
  const provider = await createProvider(MetamaskProvider)
  console.log(provider.address)

  // Initialize the object that represents the transaction operation, in this case on EVM.
  op.value = createCheckoutOperation(EVMOperation, provider)

  // Get the chains that are supported from that chain type.
  chains.value = await op.value.getSupportedChains()
  console.log(toRaw(chains.value))

  // Select the chain to pay from.
  // This example uses the Goerli chain, but your application can ask the user which chain to use.
  const sourceChain = chains.value.find((i: BridgeChain) => i.name === sourceChainName)!
  console.log(toRaw(sourceChain))

  // Select the chain to pay on.
  // In this case, the NFT contract is on the Goerli chain.
  const destinationChain = chains.value.find((i: BridgeChain) => i.name === destinationChainName)!
  console.log(toRaw(destinationChain))

  // Set the price and convert to wei
  const priceOfNft = Price.fromRaw('0.0000001', 18, destinationChain.token.symbol)
  console.log(priceOfNft.toJSON())

  // Set the parameters for the transaction, including source and destination chain.
  const params:CheckoutOperationParams = {
    chainIdFrom: sourceChain.id,
    chainIdTo: destinationChain.id,
    price: priceOfNft,
    recipient: provider.address,
    isMultiplePayment: false // Single payment token for a simple example
  }

  // Initialize the transaction object
  await op.value.init(params)

  // Load the user's balance of payment tokens on the source chain.
  // When this method runs, the wallet prompts the user to switch to the selected chain if necessary.
  // Then, the method returns the tokens on this chain that the DEX supports and that the wallet has a balance of greater than zero.
  console.log('before')
  const paymentTokens = await op.value.getPaymentTokens() //(sourceChain)
  console.log(toRaw(paymentTokens)) // returns empty array even though I have some eth on goerli
  console.log('after')

  // Select the token to accept payment in on the source chain.
  // This example hard-codes UNI, but your application can ask the user which token to pay with.
  // const selectedToken = paymentTokens.find(i => i.symbol === paymentToken)!
  // console.log(selectedToken)

  // Get the estimated purchase price in the payment token, including the cost to swap the tokens to the tokens that the seller accepts payment in.
  // At this point you can ask the user to confirm the transaction with the fees or cancel it.
  // const estimatedPrice = await op.value.estimatePrice([selectedToken])

  // Create the transaction bundle, which includes custom logic that tells the Rarimo contract what to do after unlocking the transferred tokens on the destination chain, such as calling another contract to buy the NFT on the destination chain.
  // Optionally, you can set the bundle salt to be able to access the temporary contracts that Rarimo uses to run the bundled transactions.
  // See "Bundling" in the Rarimo documentation.

  // First, use the Ethers Interface to encode a command to add to the bundle.
  // This example encodes a command that purchases the NFT on the destination chain via the NFT contract's Application Binary Interface (ABI).
  // You can include other custom logic in the bundle.
  // const encodedFunctionData = new ethers.utils
  //   .Interface(["function buy(address receiver_) payable"])
  //   .encodeFunctionData("buy", [
  //     provider.address,
  //   ])

  // Then, create a bundle and add the purchase function.
  // The first parameter is the Solidity types of the values in the second parameter.
  // In this example, the parameters and their types are:
  // 1) The address of the contract that Rarimo will call to buy the NFT (`address[]`)
  // 2) The price of the NFT on the destination chain (`uint256[]`)
  // 3) The encoded purchase function (`bytes[]`)
  // const bundle = ethers.utils.defaultAbiCoder.encode(
  //     ["address[]", "uint256[]", "bytes[]"],
  //     [
  //       [NFT_CONTRACT_ADDRESS],
  //       [params.price.value],
  //       [encodedFunctionData],
  //     ]
  // );

  // Call the asynchronous checkout method to run the transaction.
  // The `checkout()` method takes the parameters from the operation instance, gets approval from the user's wallet, and calls the Rarimo contract to handle the transaction.
  // const txHash = await op.value.checkout(estimatedPrice, { bundle })

  // Get the transaction on the source chain
  // sourceTxUrl.value = provider.getTxUrl(sourceChain!, String(txHash)) ?? ''

  // Get the transaction that unlocks tokens on the destination chain
  // const destinationTx = await op.getDestinationTx(sourceChain!, String(txHash))
  // destinationTxUrl.value = provider.getTxUrl(sourceChain!, destinationTx.hash)  ?? ''
}

sendTransaction()
</script>

<template>
  <div>
    <ul>
      <li>Source chain transaction URL: {{ sourceTxUrl }}</li>
      <li>Destination chain transaction URL: {{ destinationTxUrl }}</li>
    </ul>
  </div>
</template>