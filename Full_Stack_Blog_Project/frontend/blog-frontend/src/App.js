// import './App.css';
import { BrowserRouter } from "react-router-dom";
import StagingArea from "./components/StagingArea";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
import NavBar from "./components/NavBar";

const initVal = {
  authentication: {},
  userData: {}
};

const store = createStore(reducer, initVal);

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <StagingArea />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
