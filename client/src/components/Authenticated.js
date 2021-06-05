import React from 'react';

const Authenticated = ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
    <div>
      <div>
        <h2>{authUser.name} is authenticated!</h2>
      </div>
    </div>
  );
};

export default Authenticated;