import React,{Fragment,useState} from 'react'
import './Shipping.css'
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingInfo} from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import TransferWithinAStationRounded from '@mui/icons-material/TransferWithinAStationRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import {Country,State} from 'country-state-city'
import { useAlert } from 'react-alert'
const Shipping = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const {shippingInfo}=useSelector(state=>state.cart);

  const [address,setAddress]=useState(shippingInfo.address);
  const [city,setCity]=useState(shippingInfo.city);
  const [province,setProvince]=useState(shippingInfo.province);
  const [country,setCountry]=useState(shippingInfo.country);
  const [pinCode,setPinCode]=useState(shippingInfo.pinCode);
  const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);
  return (
    <Fragment>
       <div className="shippingContainer">

         <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
         </div>

       </div>

    </Fragment>
  )
}
         
export default Shipping







