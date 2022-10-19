import logo from "./logo.svg";
import "./App.css";
import Home from "./Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Show404 from "./ErrorPage/Show404";
import { useSelector } from "react-redux";

function App() {
  // Selector
  const selectorData = useSelector((state) => state.order.selected)
  console.log("SelectorData ==>", selectorData);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/kopeeteariareactv1/" element={<Home></Home>}></Route>
          <Route path="/kopeeteariareactv1/*" element={<Show404></Show404>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
