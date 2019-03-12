import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { Layout, SEO } from '../components';
import config from '../../config/SiteConfig';
import WorkItem from '../models/WorkItem.model';
import PathContext from '../models/PathContext.model';
import styled from 'styled-components';
import typography from '../utils/typography';
import Img from 'gatsby-image';
import mousetrap from 'mousetrap';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import * as truncate from 'truncate';

interface Props {
  data: {
    directory: WorkItem;
  };
  pathContext: PathContext;
  location: Location;
}

const { rhythm } = typography;
const footerHeight = rhythm(3);

const WorkItemFooter: any = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: ${footerHeight};
  padding: ${rhythm(0.5)} ${rhythm(1)};
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;

  h4 {
    margin-bottom: ${rhythm(0.4)};

    @media ${media.phone} {
      margin: 0;
      font-size: ${rhythm(0.4)};
    }

    @media ${media.tablet} {
      margin: 0;
    }
  }

  p {
    margin: 0;
    padding: ${rhythm(0.02)} ${rhythm(0.2)};
    background: ${theme.colors.grey.light};
    border-radius: 3px;
    font-size: ${rhythm(0.4)};
    color: ${theme.colors.grey.default};

    kbd {
      font-size: ${rhythm(0.4)};
      background: ${theme.colors.white};
      box-shadow: 0 1px 1px ${theme.colors.grey.default};
      color: ${theme.colors.grey.dark};
      border-radius: 3px;
      margin: 0 ${rhythm(0.2)};
      padding: 0 ${rhythm(0.2)};
    }

    @media ${media.phone} {
      display: none;
    }

    @media ${media.tablet} {
      display: none;
    }
  }
`;

const WorkItemPicture: any = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${footerHeight};
  padding: ${rhythm(1)} 0;
`;

const imageIndicatorTranslate = `.75rem`;

const ImageIndicator: any = styled.div`
  position: absolute;
  top: ${rhythm(1)};
  left: 0;
  min-width: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  opacity: 0.5;

  sup,
  sub {
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

  @media ${media.phone} {
    display: none;
  }
`;

const imageStyles = {
  maxWidth: `100%`,
  maxHeight: `100vh`,
  margin: `auto`,
  height: `100%`,
  objectFit: `contain`,
  marginBottom: footerHeight,
  cursor: `pointer`,
};

const imageWrapperStyles = {
  display: `grid`,
  height: `100%`,
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
    const { data, location } = this.props;
    const { name } = data.directory;
    const { currentImage } = this.state;

    return (
      <Layout isModal={true} location={location}>
        <Helmet title={`${name} | ${config.siteTitle}`} />
        <SEO />
        <ImageIndicator>
          <sup>{this.state.index + 1}</sup>
          <span>–</span>
          <sub>{this.state.total}</sub>
        </ImageIndicator>
        <WorkItemPicture onClick={e => this.nextImage(e)}>
          <Img fluid={currentImage.fluid} style={imageWrapperStyles} imgStyle={imageStyles} />
        </WorkItemPicture>
        <WorkItemFooter>
          <h4>{truncate(name, 40)}</h4>
          <p>
            Press <kbd>space</kbd> to navigate through images and press <kbd>←</kbd> or <kbd>→</kbd> to navigate through the work pieces.
          </p>
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
