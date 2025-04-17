import jwt from 'jsonwebtoken';
import { Professor } from '../models/user.model.js';

const authenticateProfessor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const professor = await Professor.findById(decoded.id).select('-password');
    if (!professor) {
      return res.status(401).json({ message: 'Professor not found' });
    }

    req.user = {
      id: professor._id,
      role: 'professor',
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateProfessor;
