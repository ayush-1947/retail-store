import jwt from "jsonwebtoken";

// Generates a token for a given user ID
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });

  // Note: Storing JWT in a cookie is common for web apps,
  // but for a pure API, just returning the token is also fine.
  // We'll return it in the response body for our API.
  return token;
};

export default generateToken;