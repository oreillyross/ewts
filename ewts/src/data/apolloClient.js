import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.REACT_APP_DEV_PEWTS_URL
});

export default client;
