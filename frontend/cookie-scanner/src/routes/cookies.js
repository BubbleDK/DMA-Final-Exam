/**
 * Cookies API module.
 * @module api/cookies
 */

import express from 'express';
import cookieScanner from '../cookieScanner.js';

/**
 * Express router to mount cookies related functions on.
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
        const collectedCookies = await cookieScanner({ url: targetUrl });

        // Respond to the client
        res.status(200).send(collectedCookies);
    } catch (error) {
        console.error('Error in cookieScanner:', error.message);
        // Handle errors and respond accordingly
        res.status(500).send('Internal Server Error');
    }
})

export default router;