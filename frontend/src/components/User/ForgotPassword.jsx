import "./ForgotPassword.css"
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { clearErrors,forgotPassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  //Will be made in the future properly after the webAPP Is deployed
    const dispatch = useDispatch(); 
    const alert = useAlert();
  
    const { error,message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };

      useEffect(() => {
 
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success(message);
        }
      }, [dispatch, error, alert,message]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>
            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
           

              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

             

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
                disabled={loading ? true : false}
              /> 
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword
