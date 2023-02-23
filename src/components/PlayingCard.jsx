import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useGameState from "../hooks/useGameState";

function PlayingCard(props) {
  const { data, flipped, secondFlipped, onClick } = props;

  const removedCards = useGameState((state) => state.removedCards);

  const isFlipped = useCallback(() => {
    if (flipped && flipped.uid === data.uid) {
      return true;
    } else if (secondFlipped && secondFlipped.uid === data.uid) {
      return true;
    }
    return false;
  }, [flipped, secondFlipped]);

  if (removedCards.indexOf(data.url) !== -1) {
    return <StyledEmptyPlace />;
  }

  return (
    <StyledCard
      className="doodle-border"
      $flipped={isFlipped()}
      onClick={() => onClick(data)}
    >
      <StyledFrontFace />
      <StyledBackFace $src={data.url} />
    </StyledCard>
  );
}

const StyledEmptyPlace = styled.div`
  width: 124px;
  height: 176px;
  position: relative;
  margin: 10px;
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
`;

const StyledCard = styled.div`
  width: 124px;
  height: 176px;
  position: relative;
  margin: 10px;
  border-radius: 10px;
  background-clip: padding-box;
  backface-visibility: visible;
  transform-style: preserve-3d;
  transition: all 1s ease-in-out;
  cursor: pointer;
  transform: rotate3d(0, ${(props) => (props.$flipped ? 1 : 0)}, 0, 180deg);
`;

const StyledFrontFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.orange};
  border-radius: 10px;
  background-clip: padding-box;
  backface-visibility: hidden;
  &:hover {
    background-color: ${(props) => props.theme.color.orangeLight};
  }
`;
const StyledBackFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.offWhite};
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.$src}");
  transform: rotate3d(0, 1, 0, 180deg);
  background-clip: padding-box;
  backface-visibility: hidden;
`;

export default PlayingCard;
