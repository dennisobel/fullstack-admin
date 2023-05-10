import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setSearchQuery, setMapType } from "state";
import profileImage from "assets/profile.jpg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const activePage = useSelector((state) => state.global.activePage);
  const [query, setQuery] = useState()

  const [animationStyle, setAnimationStyle] = useState({});
  const mapType = ["Markers","Clusters","Navigate"]

  useEffect(() => {
    setAnimationStyle({ animation: 'shimmer 2s infinite' });
  }, []);

  const handleInputChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
    setQuery(event.target.value)
  };
  return (
    <AppBar
      sx={{
        position: activePage === "geography" ? "fixed" : "static",
        // position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* /**LEFT SIDE */}
        <FlexBetween>

        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1rem">
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="0 1rem"
          >
            <IconButton className="icon" style={animationStyle} sx={{ p: "8px" }} aria-label="menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            {activePage === "geography" && <InputBase sx={{ height: "1px", width: "524px" }} placeholder="Filter subcounty, ward, street, payment status, building number, type of structure" onChange={handleInputChange} />}

            {/* <IconButton onClick={() => dispatch(setSearchQuery(query))}>
              <Search />
            </IconButton> */}
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
          </FlexBetween>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[600], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {mapType.map(el => <MenuItem key={el} onClick={() => dispatch(setMapType(el))}>{el}</MenuItem>)}
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
