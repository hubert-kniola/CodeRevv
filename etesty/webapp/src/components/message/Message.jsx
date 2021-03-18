import { connect } from "react-redux";

import { changeMessage } from "../../actions";
import { StyledDiv } from "./styles";

const Message = (props) => {
  const { message, changeMessage } = props;

  return <StyledDiv onClick={changeMessage}>{message}</StyledDiv>;
};

const mapStateToProps = (state, props) => {
  return {
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMessage: () => dispatch(changeMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
