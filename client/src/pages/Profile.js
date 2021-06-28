import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [shows, set_shows] = useState([]);
  useEffect(() => {
    (async () => {
      if (user) {
        let z = await axios.get('http://localhost:5000/api/get', {
          params: { user_email: user.email },
        });
        let show_id_arr = z.data;
      }
    })();
  }, []);
  if (!isAuthenticated) {
    return <div>please log in in homepage</div>;
  } else {
    return <div>123</div>;
  }
};

export default Profile;
