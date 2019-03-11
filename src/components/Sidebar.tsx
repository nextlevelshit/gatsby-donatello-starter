import styled from 'styled-components';
import typography from '../utils/typography';
import config from '../../config/SiteConfig';
import theme from '../../config/Theme';

export const Sidebar: any = styled.aside`
  position: sticky;
  top: ${typography.rhythm(1)};
  margin-top: ${typography.rhythm(1)};
  font-family: ${config.headerFontFamily};
  font-size: ${theme.fontSize.small};
  font-weight: 300;
  text-transform: uppercase;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;
