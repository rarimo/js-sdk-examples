<script setup lang="ts">
import { createProvider, ChainTypes } from '@rarimo/provider'
import { MetamaskProvider } from '@rarimo/providers-evm'

const getMetamaskWalletInfo = async () => {
  // Connect to the Metamask wallet in the browser, using the MetamaskProvider interface to limit bundle size.
  const provider = await createProvider(MetamaskProvider)
  await provider.connect()

  // Get the address of the wallet
  console.log('Address:', provider.address)
  console.log('chainType:', ChainTypes[provider.chainType!])
  console.log('providerType:', provider.providerType)
}

getMetamaskWalletInfo()
</script>

<template>
  <div>
  </div>
</template>
