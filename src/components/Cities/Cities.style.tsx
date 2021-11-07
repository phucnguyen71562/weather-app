import styled from 'styled-components';

export const StyledContainer = styled.div`
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media screen and (min-width: 1600px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const StyledItem = styled.div`
  &:hover > button {
    opacity: 1;
  }
`;
