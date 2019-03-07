import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
// import styled from 'styled-components';
// import kebabCase from 'lodash/kebabCase';
import { Layout } from '../components';
import config from '../../config/SiteConfig';
import WorkItem from '../models/WorkItem';
import styled from 'styled-components';
import typography from '../utils/typography';
import Img from 'gatsby-image';

interface Props {
  data: {
    directory: WorkItem;
  };
}

const footerHeight = typography.rhythm(3);

// const WorkItemHeader: any = styled.header`
//   padding: ${typography.rhythm(0.5)} ${typography.rhythm(1)};
// `;

const WorkItemFooter: any = styled.footer`
  position: absolute;
  bottom: 0;
  height: ${footerHeight};
  width: 100%;
  padding: ${typography.rhythm(0.5)} ${typography.rhythm(1)};
`;

const WorkItemPicture: any = styled.main`
  top: 0;
  bottom: ${footerHeight};
`;

const imageStyles = {
  maxWidth: `100%`,
  maxHeight: `100%`,
  margin: `auto`,
};

const imageWrapperStyles = {
  display: `grid`,
  height: `100%`,
};

export default class WorkItemPage extends React.PureComponent<Props> {
  // constructor(props, context) {
  //   super(props, context);

  //   // this.handleSelect = this.handleSelect.bind(this);

  // }
  state = {
    index: 0,
    currentImage: this.props.data.directory.children[0].childImageSharp,
    total: this.props.data.directory.children.length,
  };

  public render() {
    const { data } = this.props;
    const workItem = data.directory;

    const { currentImage } = this.state;

    return (
      <Layout isModal={true}>
        <Helmet title={`${workItem.name} | ${config.siteTitle}`} />
        <p>{workItem.name}</p>
        <WorkItemPicture onClick={e => this.nextImage(e)}>
          <Img fluid={currentImage.fluid} style={imageWrapperStyles} imgStyle={imageStyles} />
        </WorkItemPicture>
        <WorkItemFooter>Footer</WorkItemFooter>
      </Layout>
    );
  }

  protected nextImage(e: any = null) {
    if (e) {
      e.stopPropagation();
    }
    const nextIndex = (this.state.index + 1) % this.state.total;

    if (nextIndex !== this.state.index) {
      this.setState({
        index: nextIndex,
        currentImage: this.props.data.directory.children[nextIndex].childImageSharp,
      });
    }
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
`;
