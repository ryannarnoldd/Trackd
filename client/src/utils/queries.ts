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

// Future to maybe adds more specific queries for collections and items.