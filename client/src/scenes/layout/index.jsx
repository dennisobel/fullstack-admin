import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useEffect } from "react";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const signup = useSelector(state => state.global.signup)
  const activePage = useSelector((state) => state.global.activePage);
  const {data} = useGetUserQuery(userId);

  useEffect(() => {
    console.log("SIGNUP DATA:",signup)
  },[])  

  useEffect(()=>{
    if(activePage === "geography") {
      setIsSidebarOpen(false)
    }
  },[activePage])
  
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      {/* <Box flexGrow={1} > */}
      <Box flexGrow={1} style={{ overflow: activePage === 'geography' && "hidden"}}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;