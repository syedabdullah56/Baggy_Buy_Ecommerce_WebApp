import React,{Fragment,useState} from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@mui/material";
import profilePng from "../../../assets/profile.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const dashboard = () =>{
    navigate("/dashboard");
  }

  const orders = () => {
    navigate("/orders");
  }

  const account = () => {
    navigate("/account");
  }

  const logoutUser = () => {
      dispatch(logout());
      alert.success("Logout Successfully");
  }

  

  const options = [
    { icon: <ListAltIcon />, name: "Orders" ,func: orders},
    { icon: <PersonIcon />, name: "Profile",func: account},
    { icon: <ExitToAppIcon />, name: "Logout",func: logoutUser},
  ];

  if(user.role === "admin"){
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard",func: dashboard});
  }


  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:10}}/>
       <SpeedDial
       ariaLabel="SpeedDial tooltip example"
      icon={<img 
        className='speedDialIcon'
        src={user.avatar.url ? user.avatar.url : profilePng} 
        alt='Profile' />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction='down'
      className='speedDial'
      style={{zIndex:11}}

      >
       {options.map((item) => (
         <SpeedDialAction
         key={item.name}
         tooltipTitle={item.name}  
         icon={item.icon}
         onClick={item.func}
         />
       ))}
       </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
