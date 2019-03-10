import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { Layout } from '../components';
import config from '../../config/SiteConfig';
import WorkItem from '../models/WorkItem';
import styled from 'styled-components';
import typography from '../utils/typography';
import Img from 'gatsby-image';
import mousetrap from 'mousetrap';
import theme from '../../config/Theme';

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
  display: flex;
  flex-direction: column;
  height: ${footerHeight};
  padding: ${typography.rhythm(0.5)} ${typography.rhythm(1)};
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  h4 {
    margin-bottom: ${typography.rhythm(0.4)};
  }

  // p {
  //   margin: 0;
  //   padding: ${typography.rhythm(0.05)} ${typography.rhythm(0.2)};
  //   background: ${theme.colors.grey.ultraLight};
  //   border-radius: 3px;
  //   font-size: ${typography.rhythm(0.4)};
  //   color: ${theme.colors.grey.light};
  // }
`;

const WorkItemPicture: any = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${footerHeight};
  padding: ${typography.rhythm(1)} 0;
`;

const imageIndicatorTranslate = `.75rem`;

const ImageIndicator: any = styled.div`
  position: absolute;
  top:  ${typography.rhythm(1)};
  left: 0;
  min-width: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${theme.colors.grey.light};
  // font-size: ${typography.rhythm(0.6)};

  sup,
  sub {
    // font-size: ${theme.fontSize.big};
    font-weight: 700;
  }

  sup {
    transform: translateX(-${imageIndicatorTranslate});
  }

  span {
    transform: scale(2) rotate(-36deg);
  }

  sub {
    transform: translateX(${imageIndicatorTranslate});
  }
`;

const imageStyles = {
  maxWidth: `100%`,
  maxHeight: `100vh`,
  margin: `auto`,
  height: `100%`,
  objectFit: `contain`,
  marginBottom: footerHeight,
};

const imageWrapperStyles = {
  display: `grid`,
  height: `100%`,
  cursor: `pointer`,
};

export default class WorkItemPage extends React.PureComponent<Props> {
  state = {
    index: 0,
    currentImage: this.props.data.directory.children[0].childImageSharp,
    total: this.props.data.directory.children.length,
  };

  componentDidMount() {
    mousetrap.bind(`space`, e => this.nextImage(e));
  }

  componentWillUnmount() {
    mousetrap.unbind(`space`);
  }

  public render() {
    const { data } = this.props;
    const workItem = data.directory;

    const { currentImage } = this.state;

    return (
      <Layout isModal={true}>
        <Helmet title={`${workItem.name} | ${config.siteTitle}`} />
        <ImageIndicator>
          <sup>{this.state.index + 1}</sup>
          <span>–</span>
          <sub>{this.state.total}</sub>
        </ImageIndicator>
        <WorkItemPicture onClick={e => this.nextImage(e)}>
          <Img fluid={currentImage.fluid} style={imageWrapperStyles} imgStyle={imageStyles} />
        </WorkItemPicture>
        <WorkItemFooter>
          <h4>{workItem.name}</h4>
          {/* <p>
            Navigation: <kbd>spacebar</kbd> Next Image · <kbd>←</kbd> Previous Work · <kbd>→</kbd> Next Work 
          </p> */}
        </WorkItemFooter>
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
