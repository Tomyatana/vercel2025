export default async function verifyAdmin(req, res, next) {
    if (!req.body.user) {
        return res.status(400).json({msg:"Invalid user"});
    }
    if (!req.body.user.isAdmin) {
        return res.status(400).json({msg:"Not authorized"});
    }
    next();
}
