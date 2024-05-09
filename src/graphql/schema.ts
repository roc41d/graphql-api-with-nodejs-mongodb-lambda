import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!, description: String, completed: Boolean!): Todo
    updateTodo(id: ID!, title: String, description: String, completed: Boolean): Todo
    deleteTodo(id: ID!): String
  }
`;

export default typeDefs;