# Rarimo sample application: Accessing wallets

This application shows how you can use the Rarimo SDK to connect to browser-based wallets.
It uses a Vue application for demonstration purposes.

To access wallets in React applications, see the example `wallet-access-react`.

## Running the application

To set up this application locally, follow these steps:

1. Make sure that Node.JS, NPX, and Yarn are installed.

1. Install one of these wallets in your web browser if you don't have one already:

   - Coinbase
   - Metamask
   - NEAR
   - Phantom
   - Solflare

1. Clone this folder.

1. In a terminal in this folder, install the dependencies by running this command:

   ```shell
   yarn install
   ```

1. In the file `src/App.vue`, set the wallet to use by changing the wallet provider from `MetamaskProvider` to your wallet.
For example, to make the application use Coinbase wallets, change `MetamaskProvider` to `CoinbaseProvider`, as in this example:

   ```vue
   <script setup lang="ts">
   import { CoinbaseProvider, createProvider, ChainTypes } from '@rarimo/provider'

   const getMetamaskWalletInfo = async () => {
     const provider = await createProvider(CoinbaseProvider)
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
   ```

   The SDK supports these wallets:
   - [`CoinbaseProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.CoinbaseProvider.html): Coinbase wallets
   - [`MetamaskProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.MetamaskProvider.html): Metamask wallets
   - [`NearProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.NearProvider.html): NEAR wallets
   - [`PhantomProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.PhantomProvider.html): Phantom wallets
   - [`SolflareProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.SolflareProvider.html): Solflare wallets

1. In the terminal, run `yarn dev` and wait for the application to start and then open the URL `http://localhost:5173` in your web browser.

1. When the application prompts you to connect your wallet, log in to your wallet and allow the connection.

If the application is working correctly, it prints the address of your wallet in the browser console.

## References

This project was created with [Vite](https://vitejs.dev/).
