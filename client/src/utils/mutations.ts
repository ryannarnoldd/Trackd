import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_ITEM = gql`
  mutation addItem($itemData: ItemInput!) {
    addItem(itemData: $itemData) {
      _id
      username
      email
      items {
        itemId
        title
        description
        price
        condition
        image
      }
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation removeitem($itemId: ID!) {
    removeitem(itemId: $itemId) {
      _id
      username
      email
      items {
        itemId
        title
        description
        price
        condition
        image
      }
    }
  }
`;