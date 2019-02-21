import styled from 'styled-components';
import config from './../../config/SiteConfig';

interface Props {
  fullWidth?: boolean;
}

export const Container = styled.div`
  max-width: ${(props: Props) => (props.fullWidth ? '100%' : '80rem')};
  flex: 1;
  padding-right: ${config.gridGutter / 2}rem;
  padding-left: ${config.gridGutter / 2}rem;
  margin-right: auto;
  margin-left: auto;
`;
