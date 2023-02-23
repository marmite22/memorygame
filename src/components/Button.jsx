import styled from "styled-components";

function Button(props) {
  const { children } = props;

  return (
    <StyledButton {...props} className="doodle-border">
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  .doodle & {
    cursor: pointer;
    background: ${(props) => props.theme.color.green};
    color: ${(props) => props.theme.color.offWhite};
  }
`;

export default Button;
