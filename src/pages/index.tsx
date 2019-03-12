import React from 'react';
import { Layout, Work, SEO } from '../components';
import { graphql } from 'gatsby';

interface Props {
  data: any;
}

export default class IndexPage extends React.Component<Props> {
  public render() {
    const { data } = this.props;

    return (
      <Layout>
        <SEO />
        <Work data={data.allDirectory.edges} />
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allDirectory(filter: { sourceInstanceName: { eq: "work" }, fields: { workCategory: { eq: true } } }) {
      edges {
        node {
          name
          children {
            id
            __typename
            ... on Directory {
              id
              name
              fields {
                slug
              }
              children {
                id
                __typename
                ... on File {
                  id
                  name
                  childImageSharp {
                    id
                    fluid {
                      src
                      srcSet
                      aspectRatio
                      sizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
