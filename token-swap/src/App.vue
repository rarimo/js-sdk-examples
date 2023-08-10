<template>
  <div>
    <div>
      Source network: {{ sourceChainName }}<br/>
      Source token: {{ sourceTokenSymbol }}
    </div>
    <div style="margin-top:20px">
      Destination network: {{ destinationChainName }}<br/>
      Destination token: {{ destinationTokenSymbol }}
    </div>

    <button style="margin:46px 0" @click="sendSwapTransaction">Swap</button>

    <code>
    </code>
  </div>
</template>

<script setup lang="ts">
import { ChainNames, BridgeChain } from '@rarimo/shared'
import { CheckoutOperationParams, createCheckoutOperation, EVMOperation, Price } from '@rarimo/nft-checkout'
import { createProvider, ProviderUserRejectedRequest } from '@rarimo/provider'
import { MetamaskProvider } from '@rarimo/providers-evm'
import { ethers } from "ethers"

// Source and destination chains and tokens
const sourceChainName = ChainNames.Goerli
const destinationChainName = ChainNames.Fuji

const sourceTokenSymbol = "ETH"
const destinationTokenSymbol = "AVAX"

const sendSwapTransaction = async () => {
  // Connect to the Metamask wallet in the browser, using the MetamaskProvider interface to limit bundle size.
  const provider = await createProvider(MetamaskProvider)

  // Initialize the object that represents the transaction operation, in this case on EVM.
  const op = createCheckoutOperation(EVMOperation, provider)

  // Get the chains that are supported from that chain type.
  const chains = await op.getSupportedChains()

  // Select the source and destination chains.
  // This example uses the Goerli chain, but your application can ask the user which chain to use.
  const sourceChain: BridgeChain = chains.find(i => i.name === sourceChainName)!
  const destinationChain: BridgeChain = chains.find(i => i.name === destinationChainName)!

  // Configure the swap transaction
  const swapParams: CheckoutOperationParams = {
    // Source and destination chains
    chainIdFrom: sourceChain.id,
    chainIdTo: destinationChain.id,
    // Address to send the swapped tokens to
    recipient: provider.address!.toString(),
    // Amount of tokens to receive
    price: Price.fromRaw('1', 18, destinationTokenSymbol),
    isMultiplePayment: false,
  }

  console.log('Swapping',
    sourceTokenSymbol, 'on', sourceChainName,
    'for', swapParams.price.toString(), destinationTokenSymbol,
    'on', destinationChainName
  )

  // Initialize the transaction
  await op.init(swapParams)

  // Due to a limitation in the SDK, include an empty bundle for the transaction to work when the transactions are on the same chain.
  const bundle = ethers.utils.defaultAbiCoder.encode(
    ["address[]", "uint256[]","bytes[]"],
    [
      [],
      [],
      [],
    ],
  )

  // Get the available tokens
  const tokens = await op.getPaymentTokens()
  if (tokens.length === 0) {
    console.log('No tokens in the wallet have a large enough balance to make the swap.')
  }

  // Make sure that the wallet has enough of the source token
  const paymentToken = tokens.find(({ symbol }) => symbol === sourceTokenSymbol)
  if (!paymentToken) {
    console.log('You do not have enough', sourceTokenSymbol, 'to make the swap.')
  }

  const estimatedPrices = await op.estimatePrice([paymentToken!])

  // Run the transaction.
  // The `checkout()` method takes the parameters from the operation instance, gets approval from the user's wallet, and calls the Rarimo contract to handle the transaction.
  // Change the next line to await op.checkout(estimatedPrices, { bundle }) if the source and destination chains are the same:
  await op.checkout(estimatedPrices)
    .then((txHash) => {
      console.log('Swap complete:', txHash)
    })
    .catch((e:ProviderUserRejectedRequest) => {
      console.log('The user rejected the transaction.')
    })
}
</script>
