import "./App.css";
import DataForm from "./component/DataForm";
import UserCard from "./component/Resume";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">  
          <Routes>
            <Route path="/" element={<DataForm />} />
            <Route path="/userCard" element={<UserCard />} />
          </Routes>
    </div>
  );
}

export default App;