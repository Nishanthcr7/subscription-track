import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env';
import User from '../models/user.model';
const authorize = async (req, res, next) => {

    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({ message: 'unauthorized' })
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: 'unauthorized' })

        req.user = user;

        next()

    } catch (err) {
        res.status(401).json({ message: 'Unauthorized', error: error.message })
    }
}

export default authorize;