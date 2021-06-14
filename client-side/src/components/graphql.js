import ApolloClient,{gql} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});


export const getUsersList = gql`
  query {
    users {
      id
      firstName
      lastName
      userName
      age
      email
      role
    }
  }
`;