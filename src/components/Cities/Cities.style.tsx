import styled from 'styled-components';

export const StyledContainer = styled.div`
  grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 0.8fr);
`;

export const StyledItem = styled.div`
  &:hover > button {
    opacity: 1;
  }
`;
