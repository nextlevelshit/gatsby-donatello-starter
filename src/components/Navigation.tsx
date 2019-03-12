import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import theme from '../../config/Theme';
import typography from '../utils/typography';
import { media } from '../utils/media';

const fontFamily = typography.options.headerFontFamily ? typography.options.headerFontFamily.join() : 'inherit';

const List = styled.ul`
  display: flex;
  height: 100%;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;

  @media ${media.phone} {
    justify-content: flex-end;
  }
`;

const Item = styled.li`
  margin-right: ${typography.rhythm(1)};
  display: inline-block;
  margin: 0;
  padding: 0;
`;

const NavigationLink = styled(Link)`
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 2px;
  font-family: ${fontFamily};
  margin-right: ${typography.rhythm(1)};
  color: ${theme.colors.grey.default};
  border-bottom: 2px solid ${theme.colors.grey.tint};

  @media ${media.phone} {
    margin-right: 0;
    margin-left: ${typography.rhythm(0.5)};
    letter-spacing: 0;
  }

  &:hover,
  &:focus {
    color: ${theme.colors.grey.dark};
    border-color: ${theme.colors.grey.dark};
  }

  &.active {
    color: ${theme.colors.primary};
    border-color: ${theme.colors.secondary};
  }
`;

export class Navigation extends React.PureComponent<{}> {
  public render() {
    return (
      <List>
        <Item>
          <NavigationLink to="/" activeClassName="active">
            Work
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to="/about/" activeClassName="active">
            About
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to="/news/" activeClassName="active">
            News
          </NavigationLink>
        </Item>
        <Item>
          <NavigationLink to="/contact/" activeClassName="active">
            Contact
          </NavigationLink>
        </Item>
      </List>
    );
  }
}
