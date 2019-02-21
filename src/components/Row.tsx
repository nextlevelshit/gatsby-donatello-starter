import styled from 'styled-components';
import config from '../../config/SiteConfig';

export const Row = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  margin-left: -${config.gridGutter / 2}rem;
  margin-right: -${config.gridGutter / 2}rem;
`;
