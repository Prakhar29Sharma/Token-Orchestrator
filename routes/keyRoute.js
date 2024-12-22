const express = require('express');

const router = express.Router();

const { getAvailableKey, getKeyDetails, createToken, unblockKey, deleteKey } = require('../controllers/keyController.js');

/*
 * An endpoint to retrieve an available key, ensuring the key is randomly selected and not currently in use. 
 * This key should then be blocked from being served again until its status changes. 
 * If no keys are available, a 404 error should be returned.
 */
router.get('/', getAvailableKey);

/*
 *  Provide information (e.g., assignment timestamps) about a specific key.
 */
router.get('/:id', getKeyDetails);

/*
 * An endpoint to create new keys. Each generated key has a life of 5 minutes 
 * after which it gets deleted automatically if keep-alive operation is not run for that key
 */
// status : 201

router.post('/', createToken);

/*
 * An endpoint to unblock a previously assigned key, making it available for reuse.
 */

router.put('/:id', unblockKey);

/*
 * An endpoint to permanently remove a key from the system. 
 */

router.delete('/:id', deleteKey);

module.exports = router;
