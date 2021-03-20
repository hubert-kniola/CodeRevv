import { MainText } from "./styles";

const NotFound = ({ history }) => {
  return (
    <>
      <MainText>404</MainText>
      <button onClick={history.goBack}>Krok wstecz</button>
    </>
  );
};

export default NotFound;
