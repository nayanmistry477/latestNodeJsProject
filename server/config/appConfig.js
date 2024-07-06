// config/jwt.js
module.exports = {
    port: process.env.PORT || 5000,
    secret: process.env.JWT_SECRET || 'yoursecretkey',
    expiresIn: '1h', // Access token expiration time
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'yourrefreshsecretkey',
    refreshExpiresIn: '7d' // Refresh token expiration time
};
