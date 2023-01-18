const express = require('express');
const router = express.Router();
const mandala = require('../controllers/mandalaController');

/**
 * @api {post} /api/managers
 *  Create manager
 */
router.post('/', mandala.create);

/**
 * @api {get} /api/managers/?department_name='string'
 *  Get managers emails by department name
 */
router.route('/:_id').get(mandala.getById);

module.exports = router;
