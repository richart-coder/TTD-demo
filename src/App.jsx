import React from "react";
import { CartContainer } from "./components/cart";
import "./db/initData";
function App() {
  return (
    <div className="app">
      <main>
        <CartContainer />
      </main>
    </div>
  );
}

export default App;
