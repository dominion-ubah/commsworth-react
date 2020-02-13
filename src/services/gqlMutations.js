import { gql } from "apollo-boost";

const loginMutation = gql(`
  mutation LoginMutation($email: String!) {
    createCredential(credential: {
      email: $email
    }) {
      email
      name
      token
    }
  }
`);

export const createCredential = graphql(loginMutation, {
  name: 'createCredential'
});


