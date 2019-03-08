import { gql } from 'apollo-boost';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email password: $password) {
      token
      user {
        email
      }
    }
  }
`;