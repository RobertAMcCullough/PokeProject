import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {RestLink} from 'apollo-link-rest'
import {ApolloProvider} from 'react-apollo'

//create link for querying REST api with graphQL
const restLink = new RestLink({
  uri: 'https://pokeapi.co/api/v2/pokemon/'
})

//create Apollo client to pass to ApolloProvider
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})

//Wrap App component with ApolloProvider/client
const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'))