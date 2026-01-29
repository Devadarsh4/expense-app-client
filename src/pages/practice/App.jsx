importimport { Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App(){
    return (
      <Router>
        <Router path= "/" element={}/>
        <Route path ="/login" element ={}/>
      </Router>
    );
}

 export default App;





