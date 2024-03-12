import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import img from '../../Assets/user.png'
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../Assets/logo.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PatientsDoc from "./Pages/PatientDoc";
import MedicineDoc from "./Pages/MedicineDoc";
import SettingsDoc from "./Pages/SettingsDoc";
import AppointmentsDoc from "./Pages/AppointmentsDoc";
import { baseUrl } from "../../Services/baseUrl";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const sections = [
  { id: 1, name: "Appointments", icon: <CalendarMonthOutlinedIcon /> },
  { id: 2, name: "Patients", icon: <PeopleAltOutlinedIcon /> },
  { id: 3, name: "Medicine", icon: <MedicalServicesOutlinedIcon /> },
  { id: 4, name: "Settings", icon: <SettingsOutlinedIcon /> },
];



function DoctorHome() {


    const existinguser = JSON.parse(sessionStorage.getItem("existinguser"))

    const [activeItem, setActiveItem] = useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate()
  
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const logout = ()=>{
      sessionStorage.clear()
      navigate('/')
    }

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleListItemClick = (itemId) => {
      setActiveItem(itemId);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
  
    const drawer = (
      <div>
        <Toolbar />
  
        <List sx={{marginTop:'-6.8493150684931505vh'}} >
        <img src={logo} alt="logo" style={{height:'13.013698630136986vh',width:' 220px'}} />
          {sections.map((section) => (
            <ListItem>
              <ListItemButton
                key={section.id}
                selected={activeItem === section.id}
                onClick={() => handleListItemClick(section.id)}
                sx={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    activeItem === section.id ? "lightblue" : "transparent", // Change the highlight color for the active item
                  "&:hover": {
                    backgroundColor: "lightblue",
                    color:'#708bb8'
                  },
                }}
              >
                <ListItemIcon style={{color:'#708bb8'}}>{section.icon}</ListItemIcon>
                <ListItemText
                  
                  sx={{ marginLeft: "-15px",color:activeItem===section.id?"#708bb8":"" }}
                  primary={section.name}
  
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  
    const renderContent = () => {
      switch (activeItem) {
        case 1:
          return <AppointmentsDoc/>;
        case 2:
          return <PatientsDoc/>;
        case 3:
          return <MedicineDoc/>;
        case 4:
          return <SettingsDoc/>;
        default:
          return <AppointmentsDoc/>;
      }
    };


  return (
    <div>
        
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex:100,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor:'#F9F9FA',
            boxShadow:'none'
          }}
        >
          <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div><h3 style={{color:'black'}}>carewave</h3></div>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={existinguser.doctorName}  src={existinguser.profileImage ? `${baseUrl}/uploads/${existinguser.profileImage}` : img} /> &nbsp;&nbsp;&nbsp; <span style={{fontSize:'15px'}}>{existinguser.doctorName}</span>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem  onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
          </Toolbar>
        </AppBar>
        <Box
        style={{zIndex:'100'}}
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            
            sx={{
              zIndex:100,
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
             <style>
        {`
          /* Webkit (Chrome, Safari) */
          ::-webkit-scrollbar {
            width: 0px;
            
          }

          ::-webkit-scrollbar-thumb {
            background-color: rgba(70, 90, 107,0.2);
            border-radius: 10px;
          }

          /* Firefox */
          ::-moz-scrollbar {
            width: 1px;
          }

          ::-moz-scrollbar-thumb {
            background-color: rgba(70, 90, 107,0.2);
            border-radius: 6px;
          }

          /* Internet Explorer */
          ::-ms-scrollbar {
            width: 1px;
          }

          ::-ms-scrollbar-thumb {
            background-color:  rgba(70, 90, 107,0.2);
            border-radius: 6px;
          }
        `}
      </style>
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            height:'130vh',
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor:'#F9F9FA'
          }}
        >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </div>
  )
}

export default DoctorHome