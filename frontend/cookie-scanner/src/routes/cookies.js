/**
 * Devices API module.
 * @module api/devices
 */

import express from 'express'
import cookieScanner from './cookieScanner';

/**
 * Express router to mount devices related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * Route to scan for cookies.
 * @name post/
 * @function
 * @memberof module:api/cookies
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/:url', async (req, res) => {
    const targetUrl = req.params.url;
    try {
        // Invoke the cookieScanner function with the provided URL
        await cookieScanner({ url: targetUrl });

        // Respond to the client
        res.status(200).send('Cookies scanned successfully.');
    } catch (error) {
        console.error('Error in cookieScanner:', error.message);
        // Handle errors and respond accordingly
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;