import "./App.css";
import { Box } from "@mui/material";
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom"; // eslint-disable-next-line
import LogIn from "./pages/loginSignup"; // eslint-disable-next-line
import ToDoPage from "./pages/toDo"; // eslint-disable-next-line
import Dashboard from "./pages/dashboard";// eslint-disable-next-line
import DeadlineList from "./pages/deadline"// eslint-disable-next-line
import ProjectPage from "./pages/projectpage";// eslint-disable-next-line
import SelectorDropDown from "./component/SelectorDropDown/SelectorDropDown.js"// eslint-disable-next-line
import ProfilePage from "./pages/profilepage"; // eslint-disable-next-line
import PopUpToDo from "./component/popUp/toDoPopUp";// eslint-disable-next-line
// eslint-disable-next-line
import ResourcesPage from "./pages/resourcespage";// eslint-disable-next-line
import Chatpage from "./pages/chatpage";// eslint-disable-next-line
import Tryyy from "./component/API/api";// eslint-disable-next-line
import  ErrorpopUp from "./component/popUp/ErrorpopUp"// eslint-disable-next-line
function App() {
  return (
    // k
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#fff" }}>
      {/* <PopUpDashboard/> */}
      {/* <SelectorDropDown /> */}
      {/* <ProjectPage></ProjectPage> */}
      {/* <PopUpToDo/> */}
      {/* <DeadlineList /> */}
      {/* <ResourcesPage /> */}
      {/* <Chatpage /> */}
      {/* <ProfilePage/> */}

      

{/* dashboard on complete ma msg popup */}



        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectPage/todo" element={<ToDoPage />} />
          <Route path="/projectPage" element={<ProjectPage />} />
          <Route path="/projectPage/deadline" element={<DeadlineList />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/projectPage/resources" element={<ResourcesPage />} />
          <Route path="/projectPage/chat" element={<Chatpage/>} />
          <Route path="/projectPage/progress" element={<Chatpage/>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
  }

export default App;
