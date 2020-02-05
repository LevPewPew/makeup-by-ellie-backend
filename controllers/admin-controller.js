const jwt = require('jsonwebtoken');

const index = async (req, res) => {
  const {username,password} = req.body;

  if( username && password )
  {
    if( username === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD )
    {
      let token = jwt.sign( {username: username},
                  process.env.SECRET,
                  { expiresIn: '24h' } );

      // Return the JWT token for the future API calls
      res.json(
      {
        success: true,
        message: 'Authentication successful!',
        token: token
      } );
    }
    else
    {
      res.json(
      {
        status: 403,
        success: false,
        message: 'Incorrect username or password'
      } );
    }
  }
  else
  {
    res.json(
    {
      status: 400,
      success: false,
      message: 'Authentication failed! Please check the request'
    } );
  }
}

module.exports = {
  index
};