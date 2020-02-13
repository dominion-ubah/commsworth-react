import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
export  const client = new ApolloClient({
    uri: 'https://frontendassesment20200204015954.azurewebsites.net/graphql',
    request: (operation) => {
        const token = localStorage.getItem('auth_token')
        operation.setContext({
          headers: {
            authorization: token ? `${token}` : ''
          }
        })
      }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
