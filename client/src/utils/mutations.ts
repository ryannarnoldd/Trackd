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
  mutation saveItem($itemData: ItemInput!) {
    saveItem(itemData: $itemData) {
      _id
      username
      email
      savedItems {
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

export const REMOVE_item = gql`
  mutation removeitem($itemId: ID!) {
    removeitem(itemId: $itemId) {
      _id
      username
      email
      savedItems {
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