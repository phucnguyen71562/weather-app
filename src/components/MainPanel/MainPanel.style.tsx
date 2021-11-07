import styled from 'styled-components';

export const StyledContainer = styled.div`
  flex: 1;

  background-color: #f2fbff;
  align-items: flex-end;

  @media screen and (min-width: 992px) {
    flex: 1 0 65%;
  }
`;

export const StyledWrapper = styled.div`
  max-width: 80rem;
`;
