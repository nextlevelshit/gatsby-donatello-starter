import React from 'react';
import styled from 'styled-components';
import theme from './../../config/Theme';
import typography from '../utils/typography';
import { Link } from 'gatsby';
import config from '../../config/SiteConfig';

const fontFamily = typography.options.headerFontFamily ? typography.options.headerFontFamily.join() : 'inherit';

const NavigationBrandWrapper: any = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  font-family: ${fontFamily};
  line-height: 0.9;
  text-transform: uppercase;
`;

const BrandLink = styled(Link)`
  color: ${theme.colors.grey.dark};
`;

export class NavigationBrand extends React.PureComponent<{}> {
  public render() {
    const props = {
      dangerouslySetInnerHTML: { __html: config.siteBrand },
    };

    return (
      <NavigationBrandWrapper>
        <BrandLink to={`/`} {...props} />
      </NavigationBrandWrapper>
    );
  }
}
