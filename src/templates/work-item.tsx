import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
// import styled from 'styled-components';
// import kebabCase from 'lodash/kebabCase';
import { Layout } from '../components';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';
import WorkItem from '../models/WorkItem';

interface Props {
  data: {
    directory: WorkItem;
  };
}

export default class WorkItemPage extends React.PureComponent<Props> {
  public render() {
    const workItem = this.props.data.directory;

    return (
      <Layout isModal={true}>
        <Helmet title={`${workItem.name} | ${config.siteTitle}`} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    # Select the work item which equals this id.
    directory(id: { eq: $id }) {
      name
      children {
        __typename
        ... on File {
          relativePath
        }
      }
    }
  }
`;
