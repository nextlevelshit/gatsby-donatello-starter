import React from 'react';
import Modal from 'react-modal';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
// import MdClose from 'react-icons/md';
import findIndex from 'lodash/findIndex';
import mousetrap from 'mousetrap';
// import * as PropTypes from 'prop-types';
import { navigate, StaticQuery, graphql } from 'gatsby';
// import typography from '../utils/typography';
// import config from './../../config/SiteConfig';
import styled from 'styled-components';
import * as slug from 'slug';

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

const ButtonPrevious: any = styled(FaCaretLeft)`
  cursor: pointer;
`;

const ButtonNext: any = styled(FaCaretRight)`
  cursor: pointer;
`;

interface Props {
  location: any;
  isOpen?: boolean;
}

export class WorkModal extends React.Component<Props> {
  // static propTypes = {
  //   isOpen: PropTypes.bool,
  //   location: PropTypes.object.isRequired,
  // }

  componentDidMount() {
    mousetrap.bind(`left`, () => this.previous());
    mousetrap.bind(`right`, () => this.next());
    mousetrap.bind(`spacebar`, () => this.next());
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`);
    mousetrap.unbind(`right`);
    mousetrap.unbind(`spacebar`);
  }

  findCurrentIndex() {
    let index;
    index = findIndex(items, item => item.name === this.props.location.pathname.split(`/`)[2]);
    return index;
  }

  next(e: any = null) {
    if (e) {
      e.stopPropagation();
    }
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let nextItem;
      // Wrap around if at end.
      if (currentIndex + 1 === items.length) {
        nextItem = items[0];
      } else {
        nextItem = items[currentIndex + 1];
      }
      navigate(`/work/${slug(nextItem.name)}/`);
    }
  }

  previous(e: any = null) {
    if (e) {
      e.stopPropagation();
    }
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let previousItem;
      // Wrap around if at start.
      if (currentIndex === 0) {
        previousItem = items.slice(-1)[0];
      } else {
        previousItem = items[currentIndex - 1];
      }
      navigate(`/work/${slug(previousItem.name)}/`);
    }
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

          console.log(items);

          return (
            <Modal isOpen={this.props.isOpen} onRequestClose={() => navigate(`/`)} contentLabel="Modal" style={ModalStyles}>
              <div onClick={() => navigate(`/`)}>
                <div>
                  <ButtonPrevious data-testid="previous-post" onClick={e => this.previous(e)} />
                  {this.props.children}
                  <ButtonNext data-testid="next-post" onClick={e => this.next(e)} />
                </div>
                {/* <MdClose
                  data-testid='modal-close';
                  onClick={() => push(`/`)}
                  css={{
                    cursor: `pointer`,
                    color: `rgba(255,255,255,0.8)`,
                    fontSize: `30px`,
                    position: `absolute`,
                    top: typography.rhythm(1 / 4),
                    right: typography.rhythm(1 / 4),
                  }}
                /> */}
              </div>
            </Modal>
          );
        }}
      />
    );
  }
}
