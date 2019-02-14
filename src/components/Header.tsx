import React from 'react';
import styled from 'styled-components';
import theme from '../../config/Theme';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import { Navigation } from './Navigation';
import { NavigationBrand } from './NavigationBrand';
import typography from '../utils/typography';
import config from './../../config/SiteConfig';

const headerHeight = (typography.options.baseLineHeight ? typography.options.baseLineHeight : 1) * config.headerHeightRatio;

const HeaderWrapper: any = styled.header`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.grey.ultraLight};
  height: calc(${headerHeight} * ${config.baseFontSize});
`;

export class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <HeaderWrapper>
        <Container>
          <Row>
            <Column width={{ default: config.defaultColumnsLeft }}>
              <NavigationBrand />
            </Column>
            <Column width={{ default: config.defaultColumnsRight }}>
              <Navigation />
            </Column>
          </Row>
        </Container>
      </HeaderWrapper>
    );
  }
}
