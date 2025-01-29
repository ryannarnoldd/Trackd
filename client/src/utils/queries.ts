import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
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
