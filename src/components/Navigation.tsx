import React from 'react';
import styled from 'styled-components';
import config from '../../config/SiteConfig';
import { Container } from './Container';
import { Row } from './Row';
import { Column } from './Column';

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: inline-block;
`;

export class Navigation extends React.PureComponent<{}> {
  public render() {
    return (
      <List>
        <Item>Home</Item>
        <Item>Work</Item>
        <Item>News</Item>
        <Item>Contact</Item>
      </List>
    );
  }
}
