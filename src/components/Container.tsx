import styled from 'styled-components';
import config from './../../config/SiteConfig';

interface Props {
  fullWidth?: boolean;
}

export const Container = styled.div`
  width: ${(props: Props) => (props.fullWidth ? '100%' : '100rem')};
  padding-right: calc(${config.gridGutter} / 2);
  padding-left: calc(${config.gridGutter} / 2);
  margin-right: auto;
  margin-left: auto;
`;
