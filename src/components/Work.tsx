import React from 'react';
// import styled from 'styled-components';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';

export class Work extends React.PureComponent<{}> {
  render() {
    return (
      <Container>
        <Row>
          <Column width={{ default: 3 }}>
            <aside>Sidebar</aside>
          </Column>
          <Column width={{ default: 9 }}>
            <div>Work</div>
          </Column>
        </Row>
      </Container>
    );
  }
}
