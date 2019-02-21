import React from 'react';
import styled from 'styled-components';
import theme from '../../config/Theme';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import typography from './../utils/typography';
import config from './../../config/SiteConfig';
import { Link } from 'gatsby';

const FooterWrapper = styled.div`
  background-color: ${theme.colors.grey.ultraLight};
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: ${typography.rhythm(config.footerHeightRatio)};

  a {
    font-size: ${theme.fontSize.small};
    color: ${theme.colors.grey.light};
  
    &:hover,
    &.active {
      color: ${theme.colors.grey.dark};
    }
  }
`;

const FooterLinkWrapper = styled.nav`
  display: flex;
  justify-content: flex-end;

  a {
    margin-left: ${typography.rhythm(0.5)};
  }
`;

export class Footer extends React.PureComponent<{}> {
  public render() {
    return (
      <FooterWrapper>
        <Container>
          <Row>
            <Column width={{ default: config.defaultColumnsLeft }}>
              <a href="https://dailysh.it" target="_blank">
                made with ♥
              </a>
            </Column>
            <Column width={{ default: config.defaultColumnsRight }}>
              <FooterLinkWrapper>
                <Link to="imprint" activeClassName="active">
                  Imprint
                </Link>
                <Link to="impressum" activeClassName="active">
                  Impressum
                </Link>
              </FooterLinkWrapper>
            </Column>
          </Row>
        </Container>
      </FooterWrapper>
    );
  }
}
