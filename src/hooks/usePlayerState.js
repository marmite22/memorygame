import { create } from "zustand";

class Player {
  constructor() {
    this.name = "";
    this.age = -1;
    this.score = 0;
    this.isTurn = false;
  }

  setDetails(values) {
    this.name = values.name || this.name;
    this.age = values.age || this.age;
    this.score = values.score !== undefined ? values.score : this.score;
    this.isTurn = values.isTurn !== undefined ? values.isTurn : this.isTurn;
  }
}

const usePlayerState = create((set) => ({
  player1: new Player(),
  player2: new Player(),
  startGame: (details) =>
    set((state) => {
      state.player1.setDetails({
        name: details.player1_name,
        age: parseInt(details.player1_age),
        isTurn: parseInt(details.player1_age) <= parseInt(details.player2_age),
      });
      state.player2.setDetails({
        name: details.player2_name,
        age: parseInt(details.player2_age),
        isTurn: parseInt(details.player2_age) < parseInt(details.player1_age),
      });
      return {
        player1: state.player1,
        player2: state.player2,
      };
    }),
  nextPlayersTurn: () => {
    set((state) => {
      let p1Turn = true;
      let p2Turn = false;
      if (state.player1.isTurn) {
        p1Turn = false;
        p2Turn = true;
      }
      state.player1.setDetails({
        isTurn: p1Turn,
      });
      state.player2.setDetails({
        isTurn: p2Turn,
      });
      return {
        player1: state.player1,
        player2: state.player2,
      };
    });
  },
  incrementScore: () => {
    set((state) => {
      if (state.player1.isTurn) {
        state.player1.setDetails({
          score: state.player1.score + 1,
        });
      } else {
        state.player2.setDetails({
          score: state.player2.score + 1,
        });
      }

      return {
        player1: state.player1,
        player2: state.player2,
      };
    });
  },
}));

export default usePlayerState;
