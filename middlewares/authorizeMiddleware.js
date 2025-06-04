export const authorize= (...roles) =>{
    return (req, res, next) =>{
         if (!req.user) {
      res.status(401);
      return next(new Error('Not authenticated'));
    }
        if (!roles.includes(req.res.role)) {
            return res.status(403).json({
                message: 'Access denied : insufficient permission',
            });
        }
        next();
    };
};