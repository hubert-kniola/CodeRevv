import styled from "styled-components";
import background from "../images/bg.png";

export const PageContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-repeat: auto;
  z-index: 10;
  background-image: url(${background});
  background-position: center;
  background-position-y: -80%;
  background-size: cover;
`;

export const MainText = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 60%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 5vw;
`;