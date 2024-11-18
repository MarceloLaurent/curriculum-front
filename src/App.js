import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/global";

import { Home } from './pages/home';
import { HomeLogado} from './pages/home-logado';
import { Login } from './pages/login';
import { SignUp } from "./pages/signup";
import { AddCourse } from "./pages/addCourse";
import { AddExperience } from "./pages/addExperience";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logado/:id" element={<HomeLogado />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/logado/:id/cursos" element={<AddCourse/>} />
        <Route path="/logado/:id/experiencias" element={<AddExperience/>} />
      </Routes>
    </Router>
  );
}

export default App;
