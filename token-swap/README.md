# Rarimo sample application: Swapping tokens

This application shows how you can use the Rarimo SDK to swap tokens on the same chain or across chains.
It uses a Vue application for demonstration purposes.

For more information about swaps, see [Swapping tokens](https://docs.rarimo.com/overview/swapping-tokens) in the Rarimo documentation.

## Running the application

To set up this application locally, follow these steps:

1. Make sure that Node.JS and Yarn are installed.

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

   // ...

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

1. Set the source and destination tokens and chains on these lines:

   ```vue
   const sourceChainName = ChainNames.Goerli
   const destinationChainName = ChainNames.Sepolia

   const sourceTokenSymbol = "UNI"
   const destinationTokenSymbol = "ETH"
   ```

   For information about the chains and tokens that Rarimo supports, see [Swapping tokens](https://docs.rarimo.com/overview/swapping-tokens) in the Rarimo documentation.

1. In the `price` variable, set the amount of tokens to receive after the swap.
Make sure that you have enough to make the swap, because token values can vary widely.

   ```vue
   price: Price.fromRaw('0.00001', 18, destinationTokenSymbol),
   ```

1. In the terminal, run `yarn dev` and wait for the application to start and then open the URL `http://localhost:5173` in your web browser.

1. When the application prompts you to connect your wallet, log in to your wallet and allow the connection.

1. On the page, click the Swap button.

If the application is working correctly, it runs the transaction and sends the swapped tokens to your wallet.

## References

This project was created with [Vite](https://vitejs.dev/).
