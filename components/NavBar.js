/* eslint-disable no-template-curly-in-string */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Badge } from '@mui/material';
import logo from '../styles/curatorie_nav_logo.png';
import { signOut } from '../utils/auth';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar({ navObj, shareRequests }) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/users/${navObj.id}`);
  };

  let profileImage = '';

  if (navObj && navObj.image_url !== '') {
    profileImage = navObj.image_url;
  } else {
    profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }

  return (
    <nav className="navbar navbar-expand-md .me-auto .ml-auto navBarStyle">
      <div className="container-fluid navbarContents">
        <Link passHref href="/">
          <h3 className="curatorieTitle pointer" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            <Image src={logo} className="navLogo" alt="logo" style={{ width: '100px', height: '50px' }} />
          </h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse navBarLinksDiv" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link myBoardsLink">
                  my boards
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/boards/shared/all">
                <a className="nav-link sharedBoardsLink">
                  shared boards
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Badge className="requestCounterBadge" badgeContent={shareRequests.length} max={99} color="success">
                <Link passHref href="/boards/shared/requests/all">
                  <a className="nav-link shareRequestsLink">
                    share requests
                  </a>
                </Link>
              </Badge>
            </li>
          </ul>
        </div>

        <div className="navbarProfile" id="navbarTogglerDemo01">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img src={profileImage} width="45px" height="45px" alt="user" className="user-icon rounded-circle" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <div className="profileDropdownBottomDiv">
                  <ProfileDropdown userObj={navObj} />
                  <button type="button" className="goToProfileBtn btn" onClick={goToProfile}>
                    Profile
                  </button>
                  <button type="button" className="signOutBtn btn" onClick={signOut}>
                    Sign Out
                  </button>
                </div>
              </ul>
            </li>
            <div />
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  navObj: PropTypes.shape({
    id: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  shareRequests: PropTypes.shape({
    length: PropTypes.string,
  }).isRequired,
};
