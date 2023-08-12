const notFoundError = (res, message) => {
    return res.status(404).send(message);
};
const objectIdError = (res) => {
    return res
        .status(500)
        .send(
            "An error occurred while retrieving this data from the database "
        );
};

module.exports = {
    objectIdError,
    notFoundError,
};
