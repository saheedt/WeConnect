import { hash, compare } from 'bcrypt';
import sendGrid from '@sendgrid/mail';

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
    // check if email is sent with the request
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
      // if user doesn't exist, register new user
      if (!userController.emailExists(req, res, user) &&
      userController.isPasswordValid(req, res, req.body.password)) {
        hash(req.body.password, saltRounds, (err, encrypted) => {
          return User.create({
            email: req.body.email,
            password: encrypted
          }).then((createduser) => {
            // delete sensitive info from the DB resposnse
            // and generate a JWT(JSON web token) with user id & email
            delete createduser.dataValues.password;
            delete createduser.dataValues.updatedAt;
            delete createduser.dataValues.createdAt;
            const token = userController.sign({
              id: createduser.dataValues.id,
              email: createduser.dataValues.email
            });
            // send created user details & token
            res.status(201).send({
              message: 'user registered successfully',
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
      message: 'an unexpected error has occured',
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
    // check if email is sent with the request
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'email cannot be empty or null'
      });
    }
    return User.findOne({
      where: {
        email: req.body.email
      },
      attributes: {
        excludes: ['createdAt', 'updatedAt']
      }
    }).then((user) => {
      if (userController.isUser(req, res, user)) {
        compare(req.body.password, user.dataValues.password, (err, resp) => {
          // handle incorrect password
          if (!resp || err) {
            return res.status(400).send({
              message: 'wrong email or password'
            });
          }
          // make a JWT (JSON web token) with id and email
          const token = userController.sign({
            id: user.dataValues.id,
            email: user.dataValues.email
          });
          const authUser = {
            id: user.dataValues.id,
            email: user.dataValues.email
          };
          // delete sensitive data from DB response
          delete user.dataValues.password;
          delete user.dataValues.updatedAt;
          delete user.dataValues.createdAt;
          // send token with success response
          return res.status(200).send({
            message: 'login successful',
            user: authUser,
            token
          });
        });
      }
    }).catch(loginError => res.status(500).send({
      message: 'an unexpected error has occured',
      error: loginError.toString()
    }));
  }
  /**
   * @description Allows registered reset password
   * @static
   * @param {object} req client request
   * @param {object} res server Response
   * @returns {object} server response object
   * @memberof userController
   */
  static reset(req, res) {
    if (userController.isEmptyOrNull(req.body.email)) {
      return res.status(400).send({
        message: 'invalid identity supplied'
      });
    }
    return User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'no user found with this identity'
        });
      }
      const emailEncode = userController.sign({ email: user.dataValues.email });
      const idEncode = userController.sign({ id: user.dataValues.id });
      const location = req.get('host');
      const resetLink = `${location}/reset/${emailEncode}_nioj_${idEncode}`;
      sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
      const mailOptions = {
        from: 'no-reply@weconnect.com',
        to: req.body.email,
        subject: 'WeConnect password reset',
        text: `Please reset your WeConnect password with this link:
          ${resetLink}`
      };
      sendGrid.send(mailOptions, (error, body) => {
        if (error) {
          return res.status(400).send({
            message: 'error sending mail, try again',
            error
          });
        }
        if (body) {
          return res.status(200).send({
            message: 'password reset link generated, please check email'
          });
        }
      });
      // mailgun.messages().send(mailOptions, (error, body) => {
      //   console.log(error);
      //   console.log(body);
      //   if (error) {
      //     return res.status(400).send({
      //       message: 'error sending mail, try again',
      //       error
      //     });
      //   }
      //   if (body) {
      //     return res.status(200).send({
      //       message: 'password reset link generated, please check email'
      //     });
      //   }
      // });
    }).catch(resetError => res.status(500).send({
      message: 'an unexpected error has occured',
      error: resetError.toString()
    }));
  }
}
