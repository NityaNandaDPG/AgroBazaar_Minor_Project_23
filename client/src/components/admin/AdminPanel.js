import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/admin/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Error from Server');
      });
  }, []);

  const userList =
    users.length === 0
      ? 'there is no user record!'
      : users.map((item, k) => <UserCard user={item} key={k} />);

    return (
    <div>
        <div className='col-md-11'>
          {/* <Link to='/form' className='btn btn-outline-warning float-right'>+ Post a Product</Link> */}
          <br />
          <br />
          <hr />
        </div>
        <div className='grid-container'>
          {userList}
        </div>
    </div>
    )
}

export default AdminPanel;