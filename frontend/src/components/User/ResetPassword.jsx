import "./ResetPassword.css"
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { clearErrors, loadUser, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

  
    const { error,success, loading } = useSelector((state) => state.forgotPassword);
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token,myForm));
    };
    
    useEffect(() => {
   
      if (error) { 
        alert.error(error);
        dispatch(clearErrors());
    
      }
  
      if (isUpdated) {
        alert.success('Password Updated Successfully');
        navigate('/login');
  
     
      }
    }, [dispatch, error, alert, navigate,success]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>
            <form
              className="resetPasswordForm"
              encType="multipart/form-data"
              onSubmit={resetPasswordSubmit}
            >
            
         


          <div >
                                  <LockOpenIcon />
                                  <input type="password" placeholder="New Password" required 
                                  value={password} 
                                  onChange={(e) => setPassword(e.target.value)} />
          </div>
           

          <div className="loginPassword">
                                  <LockIcon />
                                  <input type="password" placeholder="Confirm Password" required 
                                  value={confirmPassword} 
                                  onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
            
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
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

export default ResetPassword
