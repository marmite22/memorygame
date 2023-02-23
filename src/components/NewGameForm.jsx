import { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import useGameState from "../hooks/useGameState";
import usePlayerState from "../hooks/usePlayerState";
import Meeple from "./Meeple";

function NewGameForm(props) {
  const gameState = useGameState();
  const playerState = usePlayerState();

  const handleStartClick = useCallback((ev) => {
    ev.preventDefault();
    const data = new FormData(ev.nativeEvent.target);
    gameState.startGame();
    playerState.startGame(Object.fromEntries(data.entries()));
  });

  return (
    <>
      <h2>New game</h2>
      <p>Youngest player starts!</p>
      <form onSubmit={handleStartClick}>
        <StyledFieldset>
          <legend>Welcome, player 1</legend>
          <div>
            <label htmlFor="player1Name">Player 1 name</label>
            <input id="player1Name" name="player1_name" type="text" required />
            <label htmlFor="player1Age">Player 1 age</label>
            <input
              id="player1Age"
              name="player1_age"
              type="number"
              step="1"
              min="0"
              required
            />
          </div>
          <StyledImageContainer>
            <Meeple player={1} size="big" />
          </StyledImageContainer>
        </StyledFieldset>
        <br />
        <StyledFieldset>
          <legend>Welcome, player 2</legend>
          <div>
            <label htmlFor="player2Name">Player 2 name</label>
            <input id="player2Name" name="player2_name" type="text" required />
            <label htmlFor="player2Age">Player 2 age</label>
            <input
              id="player2Age"
              name="player2_age"
              type="number"
              step="1"
              min="0"
              required
            />
          </div>
          <StyledImageContainer>
            <Meeple player={2} size="big" />
          </StyledImageContainer>
        </StyledFieldset>
        <br />
        <StyledButton>Start game</StyledButton>
      </form>
    </>
  );
}
const StyledImageContainer = styled.div`
  margin-left: auto;
`;
const StyledButton = styled(Button)`
  align: right;
`;
const StyledFieldset = styled.fieldset`
  display: flex;
  align-items: center;
`;

export default NewGameForm;
