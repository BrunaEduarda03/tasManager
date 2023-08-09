const notAllowedFieldsToUpdateError = (res, message) => {
    return res.status(500).send(message);
};
module.exports = notAllowedFieldsToUpdateError;
