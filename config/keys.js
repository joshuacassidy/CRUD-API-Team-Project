// figures out which set of keys to retrieve. if we are in production get the keys from ./prodution other wise get the keys from ./dev
// module.exports =require('./dev');
module.exports = process.env.NODE_ENV === 'production' ? require('./production') : require('./dev');
