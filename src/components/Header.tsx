import React from 'react';
import styled from 'styled-components';
import theme from '../../config/Theme';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import { Navigation } from './Navigation';
import { NavigationBrand } from './NavigationBrand';

const HeaderWrapper: any = styled.header`
  background-color: ${theme.colors.grey.ultraLight};
`;

export class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <HeaderWrapper>
        <Container>
          <Row>
            <Column width={{ default: 3 }}>
              <NavigationBrand />
            </Column>
            <Column width={{ default: 9 }}>
              <Navigation />
            </Column>
          </Row>
        </Container>
      </HeaderWrapper>
    );
  }
}
