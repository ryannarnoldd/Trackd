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
        email
        password
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
  mutation removeItemFromCollection($collectionId: ID!, $itemId: ID!) {
    removeItemFromCollection(collectionId: $collectionId, itemId: $itemId) {
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

export const CREATE_COLLECTION = gql`
  mutation createCollection($title: String!, $description: String, $image: String) {
    createCollection(title: $title, description: $description, image: $image) {  
      _id
      title
      description
      image
}}`;

export const ADD_ITEM_COLLECTION = gql`
  mutation addItemToCollection($collectionId: ID!, $itemData: ItemInput!) {
    addItemToCollection(collectionId: $collectionId, itemData: $itemData) {
      collectionId
      title
      description
      image
      items {  
        itemId
        title
        description
        price
        condition
        image
    }}}`;