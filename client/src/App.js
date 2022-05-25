import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import Welcome from "./pages/welocme-page/WelcomePage";
import CreateFamily from "./pages/create-family-page/CreateFamilyPage";
import Families from "./pages/families-page/FamiliesPage";
import CreateTask from "./pages/create-task-page/CreateTaskPage";
import Volunteers from "./pages/volunteers-page/VolunteersPage";
import Tasks from "./pages/tasks-page/TasksPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/create-family">
            <Route index element={<CreateFamily />} />
            <Route path=":id" element={<CreateFamily />} />
          </Route>
          <Route path="/" element={<Welcome />} />
          <Route path="/families" element={<Families />} />
          <Route path="/create-task/:id" element={<CreateTask />} />
          <Route path="/tasks/:family_id" element={<Tasks />} />
          <Route
            path="/families/volunteers/:family_id/:name"
            element={<Volunteers />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
