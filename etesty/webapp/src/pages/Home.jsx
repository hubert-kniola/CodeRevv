import { Message, Logo } from "../components";
import { MainDiv } from "./styles";

const Home = (props) => {
  return (
    <MainDiv>
      <Logo />
      <Message />
    </MainDiv>
  );
};

export default Home;
