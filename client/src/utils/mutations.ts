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
      }
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation createCollection($title: String!, $description: String, $image: String) {
    createCollection(title: $title, description: $description, image: $image) {  
      _id
}}`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($collectionId: ID!) {
    deleteCollection(collectionId: $collectionId) {
      _id
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($collectionId: ID!, $name: String!, $description: String, $price: Float) {
    addItem(collectionId: $collectionId, name: $name, description: $description, price: $price) {
      _id
      items {  
        _id
}}}`;

export const DELETE_ITEM = gql`
  mutation deleteItem($collectionId: ID!, $itemId: ID!) {
    deleteItem(collectionId: $collectionId, itemId: $itemId) {
      _id
    }
  }`;

// Future to add mutations that will edit and update collections and items.