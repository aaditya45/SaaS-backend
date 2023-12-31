const { StatusCodes } = require('http-status-codes');
const Role = require('../models/roleModel');

const createRole = async(req, res) => {
    const {name} = req.body;
    const role = await Role.create({
        name,
    });
    res.status(StatusCodes.CREATED).json({
        status: true,
        content: {
          data: role
        } 
      });
}


const showRole = async(req, res) => {
    const roles = await Role.find({});
    res.status(StatusCodes.OK).json({
        status: true,
        content: {
          data: roles
        } 
      });
}

module.exports = {
    showRole,
    createRole
};