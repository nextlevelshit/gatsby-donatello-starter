import React from 'react';
import Modal from 'react-modal';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import findIndex from 'lodash/findIndex';
import mousetrap from 'mousetrap';
// import * as PropTypes from 'prop-types';
import { navigate, StaticQuery, graphql, push } from 'gatsby';
import typography from '../utils/typography';
import config from './../../config/SiteConfig';
import styled from 'styled-components';
import * as slug from 'slug';
import * as truncate from 'truncate';
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

  @media ${media.phone} {
    margin-right: ${typography.rhythm(2)};
  }

  @media ${media.tablet} {
    margin-right: ${typography.rhythm(2)};
  }
`;

const Next: any = styled.div`
  position: absolute;
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

  @media ${media.phone} {
    margin-left: ${typography.rhythm(2)};
  }

  @media ${media.tablet} {
    margin-left: ${typography.rhythm(2)};
  }
`;

const ButtonClose: any = styled(MdClose)`
  position: absolute;
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

  @media ${media.phone} {
    margin-bottom: ${typography.rhythm(2)};
    margin-left: ${typography.rhythm(2)};
  }

  @media ${media.tablet} {
    margin-bottom: ${typography.rhythm(2)};
    margin-left: ${typography.rhythm(2)};
  }
`;

interface Props {
  location: Location;
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
    index = findIndex(items, item => {
      return this.slugify(item.name) === this.props.location.pathname.split(`/`)[2];
    });

    return index;
  }

  slugify(raw: string): string {
    return slug(raw, { lower: true });
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
    if (this.next()) {
      if (e) {
        e.stopPropagation();
      }
      push(`/work/${this.slugify(this.next().name)}/`);
    }
  }

  nextTitle(): string {
    if (this.next()) {
      return truncate(this.next().name, 25);
    }
    return ``;
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
    return null;
  }

  previousLink(e: any = null): void {
    if (this.previous()) {
      if (e) {
        e.stopPropagation();
      }
      push(`/work/${this.slugify(this.previous().name)}/`);
    }
  }

  previousTitle(): string {
    if (this.previous()) {
      return truncate(this.previous().name, 25);
    }
    return ``;
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
            <Modal
              isOpen={this.props.isOpen ? true : false}
              onRequestClose={() => navigate(`/`, { replace: true })}
              contentLabel="Modal"
              style={ModalStyles}
              htmlOpenClassName="modal-html--open"
              bodyOpenClassName="modal-body--open"
            >
              {this.props.children}
              <Paginator>
                <ButtonClose data-testid="modal-close" onClick={() => navigate(`/`, { replace: true })} />
                <Previous onClick={e => this.previousLink(e)} data-testid="previous-post">
                  <PreviousIcon />
                  <PreviousTitle>{this.previousTitle()}</PreviousTitle>
                </Previous>
                <Next data-testid="next-post" onClick={e => this.nextLink(e)}>
                  <NextTitle>{this.nextTitle()}</NextTitle>
                  <NextIcon />
                </Next>
              </Paginator>
            </Modal>
          );
        }}
      />
    );
  }
}
