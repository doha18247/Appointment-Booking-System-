// const jwt = require("jsonwebtoken");

// exports.verifyToken = (req, res, next) => {
//   // const token = req.cookies.Authorization?.split(" ")[1];
// const authHeader = req.headers.authorization;

// if (!authHeader) {
//   return res.status(401).json({ message: "No token provided" });
// }

// const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
// exports.checkRole = (roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: 'Unauthorized access for this role' });
//       }
//       next();
//     };
//   };
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.checkRole = (roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Unauthorized access for this role"
      });
    }

    next();
  };
};