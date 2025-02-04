import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      collections {
        _id
        title
        description
        image
        items {
          _id
          name
          price
        }
      }
    }
  }
`;


// export const QUERY_Collections = gql`
//   query GetCollections {
//     getCollections {
//       _id
//       title
//       description
//       image
//     }
//   }
// `;


// export const QUERY_CollectionById = gql`
//   {
//    query getCollectionById(collectionId: ID!) {
//     getCollectionById(collectionId: ID!) {
//         collectionId
//         title
//         description
//         image
//         items {  
          
//           itemId
//           title
//           description
//           price
//           condition
//           image
//        }
//       }
//     }
//   }
  
// `;

// export const QUERY_ItemsInCollection = gql`
//    {
//     getItemsInCollection(collectionId: ID!) {
//       getItemsInCollection(collectionId: ID!) {
//         items {  
          
//           itemId
//           title
//           description
//           price
//           condition
//           image
//        }
//       }
//     }
//   `;