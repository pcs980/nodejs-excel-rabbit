/**
 * Check if param id is present
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function checkIdParam (req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: 'Error: invalid student id' });
  }
  next();
}

/**
 * Check if request body is valid
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function checkRequestBody (req, res, next) {
  if (!req.body || Object.values(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: 'Error: empty body' });
  }
  next();
}

module.exports = {
  checkIdParam,
  checkRequestBody,
};
