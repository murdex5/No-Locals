import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <p>Hello world</p>
      </MainLayout>
    </Router>
  );
}

export default App;
