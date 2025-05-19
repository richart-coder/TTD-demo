import React from "react";
import { CartContainer } from "./components/cart";
import db from "./db/ShopDB";
function App() {
  return (
    <div className="app">
      <main>
        <CartContainer localStorage={db} />
      </main>
    </div>
  );
}

export default App;
