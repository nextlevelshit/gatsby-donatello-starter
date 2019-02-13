import styled from 'styled-components';
import config from '../../config/SiteConfig';

export const Row = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  margin-left: calc(${config.gridGutter} / -2);
  margin-right: calc(${config.gridGutter} / -2);
`;
