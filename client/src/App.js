import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import WelcomePage from "./pages/welocme-page/WelcomePage";
import CreateFamilyPage from "./pages/create-family-page/CreateFamilyPage";
import FamiliesPage from "./pages/families-page/FamiliesPage";
import CreateTaskPage from "./pages/create-task-page/CreateTaskPage";
import VolunteersPage from "./pages/volunteers-page/VolunteersPage";
import TasksPage from "./pages/tasks-page/TasksPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/create-family">
            <Route index element={<CreateFamilyPage />} />
            <Route path=":id" element={<CreateFamilyPage />} />
          </Route>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/families" element={<FamiliesPage />} />
          <Route path="/create-task/:id" element={<CreateTaskPage />} />
          <Route path="/tasks/:family_id" element={<TasksPage />} />
          <Route
            path="/families/volunteers/:family_id/:name"
            element={<VolunteersPage />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
