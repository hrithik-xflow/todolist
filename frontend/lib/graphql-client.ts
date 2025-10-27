import { GraphQLClient } from "graphql-request";

export const graphQLClient = (token: string) => {
  return new GraphQLClient("http://localhost:3000/graphql", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
