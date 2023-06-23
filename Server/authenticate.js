// // res.sendStatus(200); // equivalent to res.status(200).send('OK')
// // res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
// // res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
// // res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

const dotenv = require("dotenv");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.user = payload; // Store the user information in the request object

    next();
  } catch (error) {
    console.error("Error validating Google token:", error);
    return res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateToken;
