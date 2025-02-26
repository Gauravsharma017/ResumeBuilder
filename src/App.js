import "./App.css";
import DataForm from "./component/DataForm";
import UserCard from "./component/Resume";
import { Routes, Route } from "react-router-dom";
import Welcome from "./component/welcome";

function App() {
  return (
    <div className="App">  
          <Routes>
            <Route path="/resumeform" element={<DataForm />} />
            <Route path="/userCard" element={<UserCard />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
    </div>
  );
}

export default App;