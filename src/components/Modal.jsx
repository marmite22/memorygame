import styled from "styled-components";
import Button from "./Button";

function Modal(props) {
  const { children } = props;

  //   return null;

  return (
    <StyledModalContainer>
      <StyledModal className="doodle-border">{children}</StyledModal>
    </StyledModalContainer>
  );
}

const StyledModal = styled.div`
  min-width: 320px;
  max-width 700px;
  width: 95%;
  background: black;
  border-radius: 25px 20px 26px 2px;
  padding: 0 1em 1em 1em;

  label {
    display: block;
  }

  @media (prefers-color-scheme: light) {
    background: ${(props) => props.theme.color.offWhite};
    color: ${(props) => props.theme.color.offBlack}
  }

`;

const StyledModalContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${(props) => props.theme.color.blueLight};
  align-items: center;
  justify-content: center;
`;

export default Modal;
