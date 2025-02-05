import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    collections: [Collection]
  }

  type Collection {
    _id: ID!
    title: String!
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
    user: User!
  }
  
  input ItemInput {
    name: String!
    description: String
    price: Float
    condition: String
    image: String
  }

  input CollectionInput {
    title: String!
    description: String
    image: String
  }

  type Query {
    me: User!
    getCollections: [Collection]
    getCollectionById(collectionId: ID!): Collection
    getItemsInCollection(collectionId: ID!): [Item]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createCollection(title: String!, description: String, image: String): Collection!
    deleteCollection(collectionId: ID!): Collection!
    deleteItem(collectionId: ID!, itemId: ID!): Collection!
    addItem(collectionId: ID!, name: String!, description: String, price: Float): Collection!
  }
`;

export default typeDefs;
