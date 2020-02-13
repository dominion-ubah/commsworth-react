import { gql } from "apollo-boost";
import { graphql } from "graphql";

const statusQuery = gql(
    `
      query StatusQuery {
        status {
          message
        }
      }
    `
  );

export const getStatus = graphql(statusQuery, {
name: 'getStatus'
});

export const currentCredentialQuery = gql(
    `
      query CurrentCredentialQuery {
        credential {
          email
          name
          token
        }
      }
    `
);

export const currentCredentialQuery = gql(
    `
      query CurrentCredentialQuery {
        credential {
          email
          name
          token
        }
      }
    `
  );
  
// This query should only be ran on the in memory cache on the client.
export const getCurrentCredential = graphql(currentCredentialQuery, {
name: 'getCurrentCredential'
, options: {
    fetchPolicy: 'cache-only'
}
});