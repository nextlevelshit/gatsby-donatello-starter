import React from 'react';
import styled from 'styled-components';
import theme from '../../config/Theme';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import typography from './../utils/typography';

const footerHeight = (typography.options.baseLineHeight ? typography.options.baseLineHeight : 1) * 4;

const FooterWrapper = styled.div`
  background-color: ${theme.colors.grey.ultraLight};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${footerHeight};
  line-height: 4rem;
`;

export class Footer extends React.PureComponent<{}> {
  public render() {
    return (
      <FooterWrapper>
        <Container>
          <Row>
            <Column width={{ default: 3 }}>Made with love</Column>
            <Column width={{ default: 9 }}>Navigation</Column>
          </Row>
        </Container>
      </FooterWrapper>
    );
  }
}
