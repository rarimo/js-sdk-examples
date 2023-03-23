# Rarimo sample application: Accessing wallets in a React application

This application shows how you can use the Rarimo SDK to connect to browser-based wallets in React applications.

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

1. In the file `src/App.tsx`, set the wallet to use by changing the wallet provider from `MetamaskProvider` to your wallet.
For example, to make the application use Coinbase wallets, change `MetamaskProvider` to `CoinbaseProvider`, as in this example:

   ```tsx
   import { CoinbaseProvider } from '@rarimo/provider'
   import { useProvider } from '@rarimo/react-provider'

   function App() {
     const { provider } = useProvider(CoinbaseProvider)

     provider?.connect()
     console.log(provider?.address)

     return <div className="App">Wallet address: {provider?.address}</div>
   }

   export default App
   ```

   The SDK supports these wallets:
   - [`CoinbaseProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.CoinbaseProvider.html): Coinbase wallets
   - [`MetamaskProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.MetamaskProvider.html): Metamask wallets
   - [`NearProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.NearProvider.html): NEAR wallets
   - [`PhantomProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.PhantomProvider.html): Phantom wallets
   - [`SolflareProvider`](https://rarimo.github.io/js-sdk/classes/_rarimo_provider.SolflareProvider.html): Solflare wallets

1. In the terminal, run `yarn start` and wait for the application to start.
The application opens automatically in your default web browser, or you can open the page in a web browser by going to the URL `http://localhost:3000`.

1. When the application prompts you to connect your wallet, log in to your wallet and allow the connection.

If the application is working correctly, it prints the address of your wallet on the page.

## References

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

