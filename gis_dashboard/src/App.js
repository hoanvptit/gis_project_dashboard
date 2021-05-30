import { useState } from "react";
import "./App.css";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
      {/* <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} /> */}
      <Main />
    </div>
  );
};

export default App;
