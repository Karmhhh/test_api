import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Button } from "@mui/material";
import List from "./pages/List";
import Pagination from "./pages/Pagination";
import InfQ from "./pages/InfQ";
import Mutation from "./pages/Mutation";

function App() {
  const [page, setPage] = useState(<List></List>);
  return (
    <div className="App">
      <header className="App-header">
        <img width="5%" height="5%" src={logo} alt="logoReact"></img>
        <i className="App-link">Test Api.</i>
      </header>
      <div
        style={{
          background:'#282c34',
          margin: "1rem",
          columnGap: "5px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        <Button style={{color:'white'}} onClick={() => setPage(<List></List>)}>List</Button>
        <Button style={{color:'white'}} onClick={() => setPage(<Pagination></Pagination>)}>Pagination</Button>
        <Button style={{color:'white'}} onClick={() => setPage(<InfQ></InfQ>)}>Infinite Query</Button>
        <Button style={{color:'white'}} onClick={() => setPage(<Mutation></Mutation>)}>Mutation</Button>
      </div>
      { page }
    </div>
  );
}

export default App;
