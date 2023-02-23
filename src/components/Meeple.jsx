import styled from "styled-components";
import meeple from "../assets/meeple.svg";

function Meeple(props) {
  const { player, size = "small" } = props;

  return <SytledImg src={meeple} $player={player} $size={size} />;
}

const SytledImg = styled.img`
  width: ${(props) => (props.$size === "big" ? "100" : "30")}px;
  border: none !important;
  color: green;
  filter: ${(props) =>
    props.$player === 1
      ? `invert(28%) sepia(76%) saturate(1909%) hue-rotate(340deg)
    brightness(89%) contrast(87%)`
      : `invert(31%) sepia(79%) saturate(487%) hue-rotate(153deg) brightness(100%) contrast(95%);

      `}; ;
`;

export default Meeple;
