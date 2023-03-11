import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import Signin from '../components/Signin';
import RegisterForm from '../components/RegisterForm';
import { getUserByUid } from '../api/userData';
import { getShareRequestsByUserId } from '../api/shareRequestData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  const [profile, setProfile] = useState();
  const [shareRequests, setShareRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUserByUid(user.uid).then((result) => {
        if (!result.id) {
          Router.push('/users/new');
        } else {
          setProfile(result);
        }
      });
    }
  }, [user]);

  const getRequests = async () => {
    const theRequests = await getShareRequestsByUserId(profile.id);
    setShareRequests(theRequests);
  };

  // router.asPath to update shareRequests badge when page changes
  useEffect(() => {
    if (profile?.id) {
      getRequests();
    }
  }, [profile, router.asPath]);

  if (userLoading) {
    return <Loading />;
  }

  if (user && profile) {
    if (router.pathname === '/boards/shared/requests/all') {
      return (
        <>
          <NavBar shareRequests={shareRequests} navObj={profile} />
          <div className="container"><Component {...pageProps} getRequests={getRequests} shareRequests={shareRequests} /></div>
        </>
      );
    }
    return (
      <>
        <NavBar shareRequests={shareRequests} navObj={profile} />
        <div className="container"><Component {...pageProps} myUser={profile} /></div>
      </>
    );
  }

  if (user && !profile) {
    return (
      <>
        <RegisterForm user={user} setProfile={setProfile} />
      </>
    );
  }

  return (
    <>
      <Signin />
    </>
  );
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
