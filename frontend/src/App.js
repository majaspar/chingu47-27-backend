import "./App.css";
import "./styles/utilityClassesAndReset.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MyTasksPage from "./pages/MyTasksPage";
import NewTaskPage from "./pages/NewTaskPage";
import InvitePage from "./pages/InvitePage";
import { UserProvider } from "./contexts/UserContext";
import FourOhFour from "./pages/FourOhFour";


function App() {
  return (
    <div className="">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mytasks" element={<MyTasksPage />} />
            <Route path="/newtask" element={<NewTaskPage />} />
            <Route path="/invite" element={<InvitePage />} />

            <Route path="/*" element={<FourOhFour />} />

          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
