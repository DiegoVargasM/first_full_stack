import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { EditionView } from "./Views/EditionView";
import { CreationView } from "./Views/CreationView";
import { Home } from "./Views/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/editar-producto/:id" element={<EditionView />} />
        <Route path="/crear-producto" element={<CreationView />} />
      </Routes>
    </div>
  );
}

export default App;
