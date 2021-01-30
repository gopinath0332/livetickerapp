import logo from './logo.svg';
import './App.scss';

import { Provider } from "react-redux";

import LiveTicker from "./components/LiveTicker";
import AppStore from "./store";


function App() {
  return (
    <div className="App">
      <Provider store={AppStore()}>
        <LiveTicker />
      </Provider>
    </div>
  );
}

export default App;
