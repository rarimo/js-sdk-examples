# Rarimo sample application: Running transactions

This application shows how you can use the Rarimo SDK to create cross-chain transactions.
It uses a Vue application for demonstration purposes.

To run transactions in React applications, see the example `transaction-react`.

## Running the application

To set up this application locally, follow these steps:

1. Make sure that Node.JS, NPX, and Yarn are installed.

1. Install one of these wallets in your web browser if you don't have one already:

   - Coinbase
   - Metamask
   - NEAR
   - Phantom
   - Solflare

1. Obtain some UNI tokens as described in the [Instructions for the Rarimo demo application instructions](https://rarimo.gitlab.io/demo-settlement/?path=/story/demo-purchasewithanytoken--demo-instructions&full=true).

1. Clone this folder.

1. In a terminal in this folder, install the dependencies by running this command:

   ```shell
   yarn install
   ```

1. In the file `src/App.vue`, set the wallet to use by changing the wallet provider from `MetamaskProvider` to your wallet.
For example, to make the application use Coinbase wallets, change `MetamaskProvider` to `CoinbaseProvider`, as in this example:

   ```vue
   <script setup lang="ts">
   import { CoinbaseProvider, createProvider } from '@rarimo/provider'

   const provider = await createProvider(CoinbaseProvider)

   // ...

   </script>
   ```

   The SDK supports these wallets:
   - [`CoinbaseProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.CoinbaseProvider.html): Coinbase wallets
   - [`MetamaskProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.MetamaskProvider.html): Metamask wallets
   - [`NearProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.NearProvider.html): NEAR wallets
   - [`PhantomProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.PhantomProvider.html): Phantom wallets
   - [`SolflareProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.SolflareProvider.html): Solflare wallets

1. In the terminal, run `yarn dev` and wait for the application to start and then open the URL `http://localhost:5173` in your web browser.

1. When the application prompts you to connect your wallet, log in to your wallet and allow the connection.

If the application is working correctly, it runs the transaction and sends the NFT to your wallet.

TODO more about what happens here.

## References

This project was created with [Vite](https://vitejs.dev/).
