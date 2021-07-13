import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0;
  height: 50px;
  background-color: red;
`;

export const Button = styled.div`
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;

  &.active {
    color: #5890ff;
  }
`;