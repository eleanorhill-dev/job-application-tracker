import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/add">Add Job</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
