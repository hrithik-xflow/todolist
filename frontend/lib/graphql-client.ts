import { GraphQLClient } from "graphql-request";

export const graphQLClient = (token: string | undefined) => {
  return new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
