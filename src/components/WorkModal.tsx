import React from 'react';
import Modal from 'react-modal';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import findIndex from 'lodash/findIndex';
import mousetrap from 'mousetrap';
// import * as PropTypes from 'prop-types';
import { navigate, StaticQuery, graphql } from 'gatsby';
import typography from '../utils/typography';
import config from './../../config/SiteConfig';
import styled from 'styled-components';
import * as slug from 'slug';
import { media } from '../utils/media';

let items: any;

Modal.setAppElement(`#___gatsby`);

const ModalStyles = {
  content: {
    position: `absolute`,
    width: `100%`,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: `auto`,
    backgroundColor: props => props.theme.bg,
    padding: 0,
    border: `unset`,
    borderRadius: `unset`,
  },
  overlay: {
    position: `fixed`,
    top: 0,
    left: 0,
    height: `100vh`,
    width: `100vw`,
    overflow: `hidden`,
    backgroundColor: props => props.theme.bg,
  },
};

const footerHeight = typography.rhythm(3);

const Paginator = styled.div`
  font-family: ${config.headerFontFamily};
  font-size: ${typography.rhythm(0.5)};
`;

const Previous: any = styled.div`
  position: absolute;
  // z-index: 1000;
  left: ${typography.rhythm(1)};
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${footerHeight};
  opacity: 0.5;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;

const PreviousTitle: any = styled.div`
  @media ${media.phone} {
    display: none;
  }

  @media ${media.tablet} {
    display: none;
  }
`;

const PreviousIcon: any = styled(FaCaretLeft)`
  cursor: pointer;
  transform: scale(1.2);
  margin-right: ${typography.rhythm(0.5)};
`;

const Next: any = styled.div`
  position: absolute;
  // z-index: 1000;
  right: ${typography.rhythm(1)};
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${footerHeight};
  opacity: 0.6;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;

const NextTitle: any = styled.div`
  @media ${media.phone} {
    display: none;
  }

  @media ${media.tablet} {
    display: none;
  }
`;

const NextIcon: any = styled(FaCaretRight)`
  transform: scale(1.2);
  margin-left: ${typography.rhythm(0.5)};
`;

const ButtonClose: any = styled(MdClose)`
  position: absolute;
  z-index: 1000;
  right: ${typography.rhythm(1)};
  top: ${typography.rhythm(1)};
  cursor: pointer;
  transform: scale(1.2);
  opacity: 0.5;
  margin-bottom: ${typography.rhythm(0.5)};
  margin-left: ${typography.rhythm(0.5)};

  :hover {
    opacity: 1;
  }
`;

interface Props {
  location: any;
  isOpen?: boolean;
}

export class WorkModal extends React.Component<Props> {
  componentDidMount() {
    mousetrap.bind(`left`, () => this.previousLink());
    mousetrap.bind(`right`, () => this.nextLink());
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`);
    mousetrap.unbind(`right`);
  }

  findCurrentIndex() {
    let index;
    index = findIndex(items, item => item.name === this.props.location.pathname.split(`/`)[2]);
    return index;
  }

  next(): any {
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let nextItem;
      // Wrap around if at end.
      if (currentIndex + 1 === items.length) {
        nextItem = items[0];
      } else {
        nextItem = items[currentIndex + 1];
      }
      return nextItem;
    }
    return null;
  }

  nextLink(e: any = null): void {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/work/${slug(this.next().name)}/`);
  }

  nextTitle(): string {
    return this.next().name;
  }

  previous(): any {
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let previousItem;
      // Wrap around if at start.
      if (currentIndex === 0) {
        previousItem = items.slice(-1)[0];
      } else {
        previousItem = items[currentIndex - 1];
      }
      return previousItem;
    }
  }

  previousLink(e: any = null): void {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/work/${slug(this.previous().name)}/`);
  }

  previousTitle(): string {
    return this.previous().name;
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allDirectory(filter: { sourceInstanceName: { eq: "work" }, fields: { workItem: { eq: true } } }) {
              edges {
                node {
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
                      dir
                      extension
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
        `}
        render={data => {
          if (!items) {
            items = data.allDirectory.edges.map(e => e.node);
          }

          return (
            <Modal isOpen={this.props.isOpen} onRequestClose={() => navigate(`/`)} contentLabel="Modal" style={ModalStyles}>
              {this.props.children}
              <Paginator>
                <Previous onClick={e => this.previousLink(e)} data-testid="previous-post">
                  <PreviousIcon />
                  <PreviousTitle>{this.previousTitle()}</PreviousTitle>
                </Previous>
                <Next data-testid="next-post" onClick={e => this.nextLink(e)}>
                  <NextTitle>{this.nextTitle()}</NextTitle>
                  <NextIcon />
                </Next>
              </Paginator>
              <ButtonClose data-testid="modal-close" onClick={() => navigate(`/`)} />
            </Modal>
          );
        }}
      />
    );
  }
}
