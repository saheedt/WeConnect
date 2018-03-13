import { hash } from 'bcrypt';
import baseController from './baseController';

const { User } = require('../models');

const saltRounds = 10;

/**
 * @description Contains all user related functionalities
 * @export
 * @class userController
 */
export default class userController extends baseController {
  /**
    * @description Allows user signup
    * @static
    * @param {object} req client request
    * @param {object} res erver response
    * @returns {Object} server response object
    * @memberof userController
    */
  static create(req, res) {
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    return User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!userController.emailExists(req, res, user) &&
      userController.isPasswordValid(req, res, req.body.password)) {
        hash(req.body.password, saltRounds, (err, encrypted) => {
          return User.create({
            email: req.body.email,
            password: encrypted
          }).then((createduser) => {
            delete createduser.dataValues.password;
            delete createduser.dataValues.updatedAt;
            delete createduser.dataValues.createdAt;
            const token = userController.sign({
              id: createduser.dataValues.id,
              email: createduser.dataValues.email
            });
            res.status(201).send({
              message: 'sign up successful',
              user: createduser,
              token
            });
          }).catch(createdUserError => res.status(500).send({
            message: 'error signing up, please try again',
            error: createdUserError.toString()
          }));
        });
      }
    }).catch(userError => res.status(500).send({
      message: 'unexpected error, please try again',
      error: userError.toString()
    }));
  }
  /**
   * @description Allows registered users sign in
   * @static
   * @param {object} req client request
   * @param {object} res server Response
   * @returns {object} server response object
   * @memberof userController
   */
  static login(req, res) {
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    const found = dummyData.some(user => user.email === req.body.email);
    let appUser;
    if (userController.isUser(req, res, found)) {
      const isPasswordSame = dummyData.some((user) => {
        if (user.email === req.body.email &&
            user.password === req.body.password) {
          appUser = {
            id: user.id,
            email: user.email
          };
          return true;
        }
        return false;
      });
      if (isPasswordSame) {
        return res.status(200).send({
          message: 'login success',
          user: appUser
        });
      }
      return res.status(401).send({
        message: 'email and/or password invalid'
      });
    }
  }
}
