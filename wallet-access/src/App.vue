<script setup lang="ts">
import { createProvider, ProviderEventPayload } from '@rarimo/provider'
import { MetamaskProvider } from '@rarimo/providers-evm'
import { IProvider } from '@rarimo/provider'
import { ChainTypes } from '@rarimo/shared'
import { ref } from 'vue'

const PROVIDER_EVENTS: Array<keyof IProvider> = [
  'onInitiated',
  'onConnect',
  'onAccountChanged',
]

const address = ref('')

const getMetamaskWalletInfo = async () => {
  // Connect to the Metamask wallet in the browser, using the MetamaskProvider interface to limit bundle size.
  const provider = await createProvider(MetamaskProvider)
  await provider.connect()

  // Get the address of the wallet
  console.log('Address:', provider.address)
  console.log('chainType:', ChainTypes[provider.chainType!])
  console.log('providerType:', provider.providerType)

  address.value = provider?.address ?? ''

  PROVIDER_EVENTS.forEach(event => {
    const providerEvent = provider[event] as (
      cb: (payload: ProviderEventPayload) => void,
    ) => void

    providerEvent?.call(provider, payload => {
      address.value ||= payload?.address ?? ''
    })
  })
}

getMetamaskWalletInfo()
</script>

<template>
  <div>
    Your wallet address is: {{ address }}
  </div>
</template>
