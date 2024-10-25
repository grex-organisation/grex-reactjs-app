import React, { useState } from 'react';

const Profile = () => {
  const [content, setContent] = useState('dashboard');

  const showContent = (selectedContent) => {
    setContent(selectedContent);
  };

  const renderContent = () => {
    switch (content) {
      case 'dashboard':
        return (
          <>
            <h1 className="title">Dashboard</h1>
            <p>This is your dashboard where you can view your activities.</p>
          </>
        );
      case 'profile':
        return (
          <>
            <h1 className="title">Profile</h1>
            <p>Update your profile information here.</p>
          </>
        );
      case 'basic':
        return (
          <>
            <h1 className="title">Basic Subscription</h1>
            <p>Details about the basic subscription plan.</p>
          </>
        );
      case 'premium':
        return (
          <>
            <h1 className="title">Premium Subscription</h1>
            <p>Details about the premium subscription plan.</p>
          </>
        );
      case 'settings':
        return (
          <>
            <h1 className="title">Settings</h1>
            <p>Change your application settings here.</p>
          </>
        );
      case 'createUser':
        return (
          <>
            <h1 className="title">Create User</h1>
            <p>Form to create a new user goes here.</p>
          </>
        );
      case 'listUsers':
        return (
          <>
            <h1 className="title">User List</h1>
            <p>List of users will be displayed here.</p>
          </>
        );
      default:
        return (
          <>
            <h1 className="title">Welcome</h1>
            <p>Select a menu item to display content here.</p>
          </>
        );
    }
  };

  return (
    <div className="container is-fluid">
      <div className="columns">
        {/* Left Sidebar */}
        <div className="column is-one-quarter">
          <aside className="menu">
            <p className="menu-label">General</p>
            <ul className="menu-list">
              <li>
                <a
                  className={content === 'dashboard' ? 'is-active' : ''}
                  onClick={() => showContent('dashboard')}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  className={content === 'profile' ? 'is-active' : ''}
                  onClick={() => showContent('profile')}
                >
                  Profile
                </a>
              </li>
              <li>
                <a>Subscription</a>
                <ul>
                  <li>
                    <a
                      className={content === 'basic' ? 'is-active' : ''}
                      onClick={() => showContent('basic')}
                    >
                      Basic
                    </a>
                  </li>
                  <li>
                    <a
                      className={content === 'premium' ? 'is-active' : ''}
                      onClick={() => showContent('premium')}
                    >
                      Premium
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li>
                <a
                  className={content === 'settings' ? 'is-active' : ''}
                  onClick={() => showContent('settings')}
                >
                  Settings
                </a>
              </li>
              <li>
                <a>Manage Users</a>
                <ul>
                  <li>
                    <a
                      className={content === 'createUser' ? 'is-active' : ''}
                      onClick={() => showContent('createUser')}
                    >
                      Create User
                    </a>
                  </li>
                  <li>
                    <a
                      className={content === 'listUsers' ? 'is-active' : ''}
                      onClick={() => showContent('listUsers')}
                    >
                      List Users
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </div>

        {/* Right Content Section */}
        <div className="column">
          <section className="content-section">{renderContent()}</section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
