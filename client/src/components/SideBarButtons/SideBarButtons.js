import "./SideBarButtons.css";
import { Button } from "@mui/material";
import {
  addTask,
  myTasks,
  myWeek,
  profile,
  todoList,
} from "../../assets/svgIcons/svgIcons.js";

const SideBarButtons = () => {
  return (
    <>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={addTask}
      >
        משימה חדשה
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={myTasks}
      >
        המשימות שלי
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={myWeek}
      >
        השבוע שלי
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={todoList}
      >
        רשימה
      </Button>
      <Button
        className="side-button"
        style={{
          marginBottom: "10px",
          justifyContent: "flex-start",
        }}
        variant="contained"
        size="medium"
        color="button"
        startIcon={profile}
      >
        פרופיל
      </Button>
    </>
  );
};
export default SideBarButtons;
