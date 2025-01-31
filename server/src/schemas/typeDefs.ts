import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    items: [Item]
  }

  type Collection {
    _id: ID!
    name: String!
    description: String
    image: String
    items: [Item]
  }

  type Item {
    _id: ID!
    name: String!
    description: String
    price: Float
    condition: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input ItemInput {
    name: String!
    description: String
    price: Float
    condition: String
    image: String
  }

  type Query {
    getCollections: [Collection]
    getCollectionById(collectionId: ID!): Collection
    getItemsInCollection(collectionId: ID!): [Item]
  }

  type Mutation {
    createCollection(title: String!, description: String, image: String): Collection
    addItemToCollection(collectionId: ID!, itemData: ItemInput!): Collection
    removeItemFromCollection(collectionId: ID!, itemId: ID!): Collection
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
