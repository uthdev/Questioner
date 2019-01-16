import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authHelpers = {};

authHelpers.validateUsers = (user) => {
  const userSchema = {
    firstname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    lastname: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    email: Joi.string().email().lowercase(),
    phonenumber: Joi.string().required(),
    password: Joi.string().min(7).alphanum().required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    username: Joi.string().required()
  };
  return Joi.validate(user, userSchema );
};

authHelpers.generateToken = (user) => {
  return jwt.sign({
      id: user.id
    },
    process.env.JWT_SECRET, 
    { 
      expiresIn: '1d' 
    });
}

authHelpers.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

authHelpers.comparePassword = (reqPassword, hashedPassword) => {
  return bcrypt.compareSync(reqPassword, hashedPassword)
}

export default authHelpers;
