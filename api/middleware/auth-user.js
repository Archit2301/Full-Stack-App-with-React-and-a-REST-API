'use strict';

// Import Modules and Models
const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Create and Export Middleware for Authentication in Routes
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });

    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);

      if (authenticated) {
        req.currentUser = user;
        console.log(
          `Authentication successful for emailAddress: ${user.emailAddress}`
        );
      } else {
        message = `Authentication failure for emailAddress: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for emailAddress: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};