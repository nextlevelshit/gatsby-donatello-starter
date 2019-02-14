import React from 'react';
// import styled from 'styled-components';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';
import config from '../../config/SiteConfig';

export class Work extends React.PureComponent<{}> {
  render() {
    return (
      <Container>
        <Row>
          <Column width={{ default: config.defaultColumnsLeft }}>
            <aside>Sidebar</aside>
          </Column>
          <Column width={{ default: config.defaultColumnsRight }}>
            <div>Work</div>
          </Column>
        </Row>
      </Container>
    );
  }
}
