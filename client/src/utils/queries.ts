import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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

