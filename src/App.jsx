import { useState } from "react";
import "doodle.css/doodle.css";
import Hud from "./components/Hud";
import Board from "./components/Board";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Board />
        <Hud />
      </ThemeProvider>
    </div>
  );
}

export default App;
