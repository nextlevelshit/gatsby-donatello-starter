import React from 'react';
import { StaticQuery, graphql, PageRenderer } from 'gatsby';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../config/Theme';
import { media } from '../utils/media';
import { Header } from './Header';
import { Footer } from './Footer';
import { WorkModal } from './WorkModal';
// import * as PropTypes from 'prop-types';
import config from '../../config/SiteConfig';
import typography from '../utils/typography';

const footerBumper = config.footerHeightRatio + 2;

const GlobalStyle = createGlobalStyle`
  ::selection {
    background: ${theme.colors.secondary};
  }

  html {
    position: relative;
    min-height: 100%;
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
    text-transform: uppercase;
  }

  .modal-body--open,
  .modal-html--open {
    overflow: hidden;
  }
`;

interface Props {
  isModal?: boolean;
}

export class Layout extends React.PureComponent<Props> {
  public render() {
    const { children } = this.props;

    if (this.props.isModal) {
      return (
        <React.Fragment>
          <PageRenderer location={{ pathname: `/` }} />
          <WorkModal isOpen={true} location={location}>
            {this.props.children}
          </WorkModal>
        </React.Fragment>
      );
    }

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
            </React.Fragment>
          </ThemeProvider>
        )}
      />
    );
  }
}
