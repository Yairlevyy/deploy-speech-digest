const {
    _getDataByUserId,
    _getDataById,
    _deleteDataById
} = require('../models/data.models.js');

const getDataByUserId = async (req,res) => {
    const {userId} = req.params;
    try {
        const data = await _getDataByUserId(userId);
        res.status(200).json(data)
    } catch (err) {
        res.status(404).json({msg:'Error occured, please try again'})      
    }
};

const getDataById = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await _getDataById(id);
        res.status(200).json(data)
    } catch (err) {
        res.status(404).json({msg:'Error occured, please try again'})      
    }
};

const deleteDataById = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await _deleteDataById(id);
        res.status(200).json({msg:"Data was successfuly deleted!"})
    } catch (err) {
        res.status(404).json({msg:'Error occured, please try again'})      
    }
};

module.exports = {
    getDataByUserId,
    getDataById,
    deleteDataById
}