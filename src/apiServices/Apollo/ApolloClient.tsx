import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,

} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

// Function to get the token - will be provided later
// Initialize getToken with a default function
// Initialize getToken to a function that can return string or null
let getToken: () => string | null = () => null;

export const setTokenRetrievalFunction = (
  tokenRetrievalFunction: () => string | null
) => {
  getToken = tokenRetrievalFunction;
};

// const httpLink = new HttpLink({
//   uri: 'http://localhost:8080/graphql'
// });

// const wsLink = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:8080/graphql-ws',
// }));

// // The split function takes three parameters:
// //
// // * A function that's called for each operation to execute
// // * The Link to use for an operation if the function returns a "truthy" value
// // * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const authLink = new ApolloLink((operation, forward) => {
  // const token = getToken();
  // operation.setContext({
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : ""
  //   }
  // });
  return forward(operation);
});

// const httpLink = new HttpLink({
//   uri: "http://localhost:8080/graphql",
// });

const httpLink = new HttpLink({
  uri: "http://Gizapp-env-1.eba-ty3933if.eu-north-1.elasticbeanstalk.com/graphql",
});

// Use the authLink to concatenate with the httpLink
const httpAuthLink = authLink.concat(httpLink);

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:8080/graphql-ws",
//     connectionParams: () => {
//       // This function will be called every time the client connects or reconnects.
//       const token = getToken();

//       return {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       };
//     },
//   })
// );

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://Gizapp-env-1.eba-ty3933if.eu-north-1.elasticbeanstalk.com/graphql-ws",
    connectionParams: () => {
      // This function will be called every time the client connects or reconnects.
      const token = getToken();

      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpAuthLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
