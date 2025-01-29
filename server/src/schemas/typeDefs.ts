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

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addItem(itemData: ItemInput!): User
    removeItem(itemId: ID!): User
  }
`;

export default typeDefs;

// input BookInput {
//   authors: [String]
//   description: String
//   bookId: String!
//   image: String
//   link: String
//   title: String!
// }