const router = require('express').Router();
const { User } = require('../../models');

// Router for creating a new user
router.post('/signup', async (req, res) => {
  try {
    const alreadyExists = await User.findOne({where: { email: req.body.email }});
    if (alreadyExists) {
      return res.status(400).json({message: "That email address is already registered."});
    }

    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    if (!userData) {
      return res
        .status(400)
        .json({
          message: "Failed to create new user. Make sure your password is at least than 8 characters long."
        });
    }

    // Create session variables based on the new in user
    req.session.user_id = userData.id;
    req.session.logged_in = true;  
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          user: userData,
          message: 'You are now registered! Unfortunately, an error occurred trying to automatically log you in. Please try logging in with your new credentials.'
        });
      }

      return res.json({
        user: userData,
        message: 'You are now registered and logged in!'
      });
    });

  } catch (err) {
    console.error(err);
    err.message = err.message ?? 'An error occurred when creating your account.';
    res.status(400).json(err);
  }
});

// Router for logging in as an existing user
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ 
          message: 'An error occurred when logging you in.'
        });
      }
      return res.json({ 
        user: userData,
        message: 'You are now logged in!'
      });
    });

  } catch (err) {
    err.message = err.message ?? 'An error occurred when logging you in.';
    res.status(400).json(err);
  }
});

//Router for logging out as a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
