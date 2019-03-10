import styled from 'styled-components';
import config from '../../config/SiteConfig';
import { media } from '../utils/media';

interface Props {
  width: {
    default: number; // desktop
    tablet?: number;
    phone?: number;
  };
}

const width = {
  desktop: (props: Props) => (100 / config.gridColumns) * props.width.default,
  tablet: (props: Props) => (100 / config.gridColumns) * (props.width.tablet ? props.width.tablet : props.width.default),
  phone: (props: Props) => (100 / config.gridColumns) * (props.width.phone ? props.width.phone : props.width.default),
};

export const Column = styled.div`
  padding-left: ${config.gridGutter / 2}rem;
  padding-right: ${config.gridGutter / 2}rem;
  max-width: ${width.desktop}%;
  flex: 0 0 ${width.desktop}%;
  ${(props: Props) => props.width.default === 0 && `display: none;`}

  @media ${media.tablet} {
    flex: 0 0 ${width.tablet}%;
    max-width: ${width.tablet}%;
    ${(props: Props) => props.width.tablet === 0 && `display: none;`}
  }
  @media ${media.phone} {
    flex: 0 0 ${width.phone}%;
    max-width: ${width.phone}%;
    ${(props: Props) => props.width.phone === 0 && `display: none;`}
  }
`;
