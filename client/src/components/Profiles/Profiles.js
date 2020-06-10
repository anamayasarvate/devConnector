import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Profiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  const { profiles, loading } = useSelector((state) => state.profile);
  return (
    <>
      {' '}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {' '}
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0
              ? profiles.map((profile) => {
                  return <ProfileItem key={profile._id} profile={profile} />;
                })
              : 'No profiles found...'}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
