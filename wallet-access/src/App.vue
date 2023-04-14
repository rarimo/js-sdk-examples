<template>
  <Suspense>
    <template #fallback>
      Loading...
    </template>
    <template #default>
      <div>
        {{ address }}
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { createProvider, ChainTypes } from '@rarimo/provider'
import { MetamaskProvider } from '@rarimo/providers-evm'

// Connect to the Metamask wallet in the browser using Web3.js, using the MetamaskProvider interface to limit bundle size.
const provider = await createProvider(MetamaskProvider)
await provider.connect()

// Get the address of the wallet and other info
console.log('Address:', provider.address)
console.log('chainType:', ChainTypes[provider.chainType!])
console.log('providerType:', provider.providerType)

const address = provider.address
</script>
