import { gql } from "graphql-request";

export const GET_TODOS = gql`
query{
  listTodos{
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
`

export const CREATE_TODOS = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODOS = gql`
mutation DeleteTodo($input:DeleteTodoInput!){
DeleteTodo(input:$input){
    id
}}
`