import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getCurrentProfile, deleteProfile } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const user = useSelector((state) => state.auth.user);

  const { profile, loading } = useSelector((state) => state.profile);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={(e) => dispatch(deleteProfile(history))}
            >
              <i className='fas fa-user-minus'></i>
              DELETE MY ACCOUNT
            </button>
          </div>
        </>
      ) : (
        <>
          {' '}
          <p>You have not setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
