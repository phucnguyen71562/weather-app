import styled from 'styled-components';
import Background from '../../assets/images/background.jpg';

export const StyledContainer = styled.div`
  flex: 1;

  background: #100f3b url(${Background}) no-repeat;
  background-size: cover;

  @media screen and (min-width: 992px) {
    flex: 0.35;
  }
`;

export const StyledTemperature = styled.h3`
  font-size: 90px;
`;
