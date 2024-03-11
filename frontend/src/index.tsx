import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);


