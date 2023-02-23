import { useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import useGameState from "../hooks/useGameState";
import usePlayerState from "../hooks/usePlayerState";
import Button from "./Button";
import Meeple from "./Meeple";
import Modal from "./Modal";
import NewGameForm from "./NewGameForm";

function Hud() {
  const gameState = useGameState();
  const playerState = usePlayerState();

  const handleNewGameClick = useCallback((e) => {
    window.location.reload();
  });

  useEffect(() => {
    if (gameState.gameInProgress) {
      alert("Youngest player starts");
    }
  }, [gameState.gameInProgress]);

  useEffect(() => {
    if (playerState.player1.isTurn) {
      alert(`It's ${playerState.player1.name}'s turn`);
    } else if (playerState.player2.isTurn) {
      alert(`It's ${playerState.player2.name}'s turn`);
    }
  }, [playerState]);

  return (
    <>
      <StyledNav>
        <StyledHeading>Craft pairs</StyledHeading>
        <StyledButton onClick={handleNewGameClick}>New game</StyledButton>
      </StyledNav>
      <StyledHud className="doodle-border">
        <StyledTop>
          <StyledPlayer $active={playerState.player1.isTurn}>
            <Meeple player={1} />
            {playerState.player1.name} ({playerState.player1.score} pairs)
          </StyledPlayer>
          <StyledPlayer $active={playerState.player2.isTurn}>
            <Meeple player={2} />
            {playerState.player2.name} ({playerState.player2.score} pairs)
          </StyledPlayer>
        </StyledTop>
      </StyledHud>
      {!gameState.gameInProgress && (
        <Modal>
          <NewGameForm></NewGameForm>
        </Modal>
      )}
    </>
  );
}

const pulse = keyframes`
@keyframes pulse {
    0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1)
    }

    50% {
        -webkit-transform: scale3d(1.05,1.05,1.05);
        transform: scale3d(1.05,1.05,1.05)
    }

    to {
        -webkit-transform: scaleX(1);
        transform: scaleX(1)
    }
}
`;

const StyledHeading = styled.h1`
  font-size: 40px;
  margin-right: auto;
`;
const StyledButton = styled(Button)``;

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-start;
  height: 66px;
  align-items: center;
  padding: 3px;
`;

const StyledHud = styled.div`
  position: fixed;
  top: 66px;
  left: 2px;
  bottom: 2px;
  right: 2px;
  padding: 0.5em;
  pointer-events: none;
`;
const StyledTop = styled.div`
  display: flex;
  align-items: center;
  img {
    margin: 0 10px;
  }
`;

const StyledPlayer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  img {
    margin: 0 10px;
  }
  opacity: ${(props) => (props.$active ? "1" : "0.8")};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-name: ${(props) => (props.$active ? "pulse" : "none")};
`;

export default Hud;
