import gql from "graphql-tag";

export const DESCRIPTORS_QUERY = gql`
  query Descriptors {
    descriptors {
      id
      tag
    }
  }
`;

export const ADD_DESCRIPTOR = gql`
  mutation createDescriptor($tag: String!) {
    createDescriptor(data: { tag: $tag }) {
      id
      tag
    }
  }
`;

export const DELETE_DESCRIPTOR = gql`
  mutation deleteDescriptor($id: ID!) {
    deleteDescriptor(where: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_DESCRIPTOR = gql`
  mutation updateDescriptor($id: ID!, $tag: String!) {
    updateDescriptor(data: { tag: $tag }, where: { id: $id }) {
      tag
      id
    }
  }
`;
