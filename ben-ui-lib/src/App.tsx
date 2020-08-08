import React from "react";

// Test
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <Button disabled >Default</Button>
      <Button btnType='primary'>Primary</Button>
      <Button btnType='link' href="http://google.com">Google</Button>

    </div>
  );
}

export default App;
