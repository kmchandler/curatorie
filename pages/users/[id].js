/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import ProfileCard from '../../components/ProfileCard';
import { getUserByUid } from '../../api/userData';

  <Head>
    <title>curatorie:profile</title>
    <meta name="profile" content="profile page" />
  </Head>;

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();

  const getTheUser = async () => {
    const fetchedProfile = await getUserByUid(user.uid);
    setProfile(fetchedProfile);
  };

  useEffect(() => {
    getTheUser();
  }, []);
  if (!profile) {
    return null;
  }

  return (
    <div className="userProfileDiv">
      <div className="profileBtn">
        <Link passHref href={`/users/edit/${profile.id}`}>
          <button className="profileButton" type="submit">{profile.id ? 'update' : 'create'} profile</button>
        </Link>
      </div>
      <ProfileCard userObj={profile} />
    </div>
  );
}

Profile.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
  }),
};
Profile.defaultProps = {
  userObj: {},
};
