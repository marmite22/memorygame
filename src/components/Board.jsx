import styled from "styled-components";
import useAxios from "axios-hooks";
import PlayingCard from "./PlayingCard";
import useGameState from "../hooks/useGameState";
import { useEffect, useState, useCallback } from "react";
import shuffle from "../utils/shuffle";
import usePlayerState from "../hooks/usePlayerState";

function Board(props) {
  const [{ data, loading, error }, refetch] = useAxios({
    url: "https://api.thecatapi.com/v1/images/search",
    headers: {
      "x-api-key":
        " live_crk5YkBDM6ZEdZRQYzOjED9VCUp0QvcADvAzwpcAbkihRjKHcIY9WQXwwgi9wB9y ",
    },
    params: {
      limit: 10,
    },
  });
  const gameState = useGameState();
  const playerState = usePlayerState();

  const [flipped, setFlipped] = useState();
  const [secondFlipped, setSecondFlipped] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (data?.length) {
      // make an array with 2 of each cat card.
      const deck = [];

      data.forEach((cat, i) => {
        deck.push({ ...cat, uid: i });
      });
      data.forEach((cat, i) => {
        deck.push({ ...cat, uid: data.length + i });
      });
      shuffle(deck);
      setCards(deck);
    }
  }, [data]);

  /** handle each time a card is flipped */
  useEffect(() => {
    if (flipped && secondFlipped) {
      const animDuration = 1000;
      setTimeout(() => {
        if (flipped.id === secondFlipped.id) {
          alert(
            `Match! ${
              playerState.player1.isTurn
                ? playerState.player1.name
                : playerState.player2.name
            } gets a point!`
          );
          // TODO increment current player's points.

          playerState.incrementScore();
          gameState.removeCard(flipped.url);
        } else {
          playerState.nextPlayersTurn();
        }
        setFlipped(undefined);
        setSecondFlipped(undefined);
      }, animDuration);
    }
  }, [flipped, secondFlipped]);

  useEffect(() => {
    console.log(gameState.removedCards);
    if (gameState.removedCards.length > 9) {
      let message = "";
      if (playerState.player1.score === playerState.player2.score) {
        message = "A tie!";
      } else if (playerState.player1.score > playerState.player2.score) {
        message = `${playerState.player1.name} won!`;
      } else {
        message = `${playerState.player2.name} won!`;
      }
      alert(`${message} Click new game to play again!`);
    }
  }, [gameState.removedCards]);

  const handleCardClick = useCallback((card) => {
    if (!flipped) {
      setFlipped(card);
    } else if (!secondFlipped) {
      setSecondFlipped(card);
    }
  });

  if (loading || !cards.length) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <StyledBoard>
      {cards.map((cat, i) => (
        <PlayingCard
          key={i}
          data={cat}
          flipped={flipped}
          secondFlipped={secondFlipped}
          onClick={handleCardClick}
        />
      ))}
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  position: fixed;
  top: 130px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1040px;
`;

export default Board;
