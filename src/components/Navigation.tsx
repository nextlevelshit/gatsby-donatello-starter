import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import PageProps from '../models/PageProps';
import theme from '../../config/Theme';
import typography from '../utils/typography';
import config from '../../config/SiteConfig';

const fontFamily = typography.options.headerFontFamily ? typography.options.headerFontFamily.join() : 'inherit';

const List = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: inline-block;
  margin: 0;
  padding: 0;
`;

// const maxLinkHeight = typography.options.baseFontSize && typography.options.baseLineHeight
//   ? typography.options.baseLineHeight * typography.options.baseFontSize
//   : 0;

const NavigationLink = styled(Link)`
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1px;
  font-family: ${fontFamily};
  padding: 0 ${typography.rhythm(0.3)};
  margin-right: ${config.gridGutter}rem;
  color: ${theme.colors.grey.light};
  border-bottom: 1px solid ${theme.colors.secondary};
  box-shadow: inset 0 -2px 0 0 ${theme.colors.secondary};

  &:hover,
  &.active {
    color: ${theme.colors.primary};
    box-shadow: inset 0 -${typography.rhythm(1)} 0 0 ${theme.colors.secondary};
  }
`;

export class Navigation extends React.PureComponent<{}> {
  public render() {
    return (
      <List>
        <Item>
          <NavigationLink to={`/`} activeClassName="active">
            Work
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to={`/about`} activeClassName="active">
            About
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to={`/news`} activeClassName="active">
            News
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to={`/contact`} activeClassName="active">
            Contact
          </NavigationLink>
        </Item>
      </List>
    );
  }
}
