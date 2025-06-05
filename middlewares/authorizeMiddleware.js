export const authorize= (...roles) =>{
    return (req, res, next) =>{
    console.log('🔐 AUTH CHECK');
    console.log('Roles allowed:', roles);
    console.log('User:', req.user);
    console.log('User Role:', req.user?.role);

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