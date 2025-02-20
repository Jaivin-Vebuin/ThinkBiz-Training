import Login from "./components/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";

function App() {
  // const { t } = useTranslation();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
