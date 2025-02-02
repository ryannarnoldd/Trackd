import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
  me {
    _id
    email
    username
    collections {
      _id
      description
      image
      items {
        _id
        description
        condition
        image
        name
        price
      }
    }
  }
  }
`;


export const QUERY_Collections = gql`
   {
    getCollections {
      collections {
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
       }
      }
    }
  }
  
`;

export const QUERY_CollectionById = gql`
  {
   query getCollectionById(collectionId: ID!) {
    getCollectionById(collectionId: ID!) {
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
       }
      }
    }
  }
  
`;

export const QUERY_ItemsInCollection = gql`
   {
    getItemsInCollection(collectionId: ID!) {
      getItemsInCollection(collectionId: ID!) {
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