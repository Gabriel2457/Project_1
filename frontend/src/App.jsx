import {Movies} from "./pages/Movies";
import "./App.css";

function App(){
  return(
    <div className="App">
      <div className="header">
        <div className="app-title"> Action! </div>
      </div>
      <Movies/>
    </div>
  );
};

export default App;