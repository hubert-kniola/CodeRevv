import { MainDiv } from "./styles";

const NotFound = ({ history }) => {
  return (
    <MainDiv>
      <h1>404</h1>
      <button onClick={history.goBack}>Krok wstecz</button>
    </MainDiv>
  );
};

export default NotFound;
