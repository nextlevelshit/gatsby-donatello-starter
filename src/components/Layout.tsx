import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import './layout.scss';
import { Header } from './Header';
import { Footer } from './Footer';
import * as PropTypes from 'prop-types';
import config from '../../config/SiteConfig';
import typography from '../utils/typography';

const footerBumper = config.footerHeightRatio + 2;

const GlobalStyle = createGlobalStyle`
  ::selection {
    background: ${theme.colors.secondary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.grey.default};
    padding-bottom: ${typography.rhythm(footerBumper)};

    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.primary};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.dark};
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
  .textRight {
    text-align:right;
  }
`;

// const Footer = styled.footer`
//   text-align: center;
//   padding: 3rem 0;
//   span {
//     font-size: 0.75rem;
//   }
// `;

// let Modal;

// import(`../components/Modal`).then(modal => {
//   Modal = modal.default;
// });

export class Layout extends React.PureComponent<{}> {
  static propTypes = {
    isModal: PropTypes.bool,
  };

  public render() {
    const { children } = this.props;

    // if (this.props.isModal && Modal) {
    //   return (
    //     <React.Fragment>
    //       <PageRenderer location={{ pathname: `/` }} />
    //       <Modal isOpen={true} location={location}>
    //         {this.props.children}
    //       </Modal>
    //     </React.Fragment>
    //   )
    // }

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              buildTime(formatString: "DD.MM.YYYY")
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <GlobalStyle />
              <Header />
              {children}
              <Footer />
              {/* <Footer>
                &copy; {split(data.site.buildTime, '.')[2]} by Majid Hajian. All rights reserved. <br />
                <a href="https://github.com/mhadaily/gatsby-starter-typescirpt-power-blog">GitHub Repository</a> <br />
                <span>Last build: {data.site.buildTime}</span>
              </Footer> */}
            </React.Fragment>
          </ThemeProvider>
        )}
      />
    );
  }
}
