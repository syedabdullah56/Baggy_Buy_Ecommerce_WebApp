import React, { Fragment, useState } from 'react';
import './Shipping.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import TransferWithinAStationRounded from '@mui/icons-material/TransferWithinAStationRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import { Country, State, City } from 'country-state-city'; 
import { useAlert } from 'react-alert';
import CheckoutSteps from '../Cart/CheckoutSteps.jsx';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {


  const dispatch = useDispatch();
  const navigate=useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (address.length < 10) {
      alert.error('Address must be at least 10 characters long.');
      return;
    }

    if (!/^\d{5}$/.test(pinCode)) {
      alert.error('Pin Code must be exactly 5 digits.');
      return;
    }

    if (!/^03\d{9}$/.test(phoneNo)) {
      alert.error('Phone Number must be 11 digits and start with "03".');
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    alert.success('Shipping Info Saved!');

    navigate("/order/confirm")
  };

  return (
    <Fragment>
        <MetaData title="Shipping Details"/>

        <CheckoutSteps activeStep={0} />


      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Postal Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationRounded />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Province</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {state && (
              <div>
                <LocationCityIcon />
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">City</option>
                  {City.getCitiesOfState(country, state).map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={!city}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
