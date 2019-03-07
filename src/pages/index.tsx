import React from 'react';
import { Layout, Work } from '../components';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import { graphql } from 'gatsby';

interface Props {
  data: any;
}

export default class IndexPage extends React.Component<Props> {
  public render() {
    const { data } = this.props;

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
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
// export const IndexQuery = graphql`
//   query {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             date(formatString: "DD.MM.YYYY")
//             category
//           }
//           timeToRead
//         }
//       }
//     }
//   }
// `;
