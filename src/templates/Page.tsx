import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { Layout, Container, Row, Column, Sidebar, Title } from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import PathContext from '../models/PathContext.model';
import Page from '../models/Page.model';
import styled from 'styled-components';

interface Props {
  data: {
    markdownRemark: Page;
  };
  location: Location;
  pathContext: PathContext;
}

const PageContent: any = styled.article`
  ul {
    padding-left: 0;
    list-style-type: none;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 1rem;

    > li {
      display: flex;
      margin-right: 1rem;
      padding-bottom: 0.8rem;
      margin-bottom: 0.8rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 0.75rem;
      color: #6c757d;
      font-weight: 300;

      > ul {
        margin-left: 1rem;
        list-style-type: none;

        > li {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 1rem;
          color: #212529;
          font-weight: 400;
        }
      }
    }
  }
`;

export default class PostPage extends React.PureComponent<Props> {
  public render() {
    const page = this.props.data.markdownRemark;
    const { headings } = this.props.pathContext;
    const { pathname } = this.props.location;
    const { title } = page.frontmatter;

    return (
      <Layout>
        {page ? (
          <>
            <Helmet title={`${title} | ${config.siteTitle}`} />
            <Container>
              <Row>
                <Column width={{ default: config.defaultColumnsLeft, phone: 0, tablet: 0 }}>
                  <Sidebar>
                    <ul>
                      {headings &&
                        headings.map(({ value, slug }, index) => (
                          <li key={index}>
                            <Link to={`${pathname}#${slug}`}>{value}</Link>
                          </li>
                        ))}
                    </ul>
                  </Sidebar>
                </Column>
                <Column width={{ default: config.defaultColumnsRight, phone: 12, tablet: 12 }}>
                  <Title>{title}</Title>
                  <PageContent dangerouslySetInnerHTML={{ __html: page.html }} />
                </Column>
              </Row>
            </Container>
          </>
        ) : null}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
