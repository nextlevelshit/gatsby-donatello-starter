import styled from 'styled-components';
import typography from '../utils/typography';

export const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0;
  padding-top: ${typography.rhythm(1)};
  margin-bottom: 0.75rem;
  font-size: ${props => props.theme.fontSize.big};
`;
