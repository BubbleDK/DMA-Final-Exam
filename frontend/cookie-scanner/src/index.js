/**
 * Main application module.
 * @module app
 */

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

/**
 * Express application.
 * @type {object}
 * @const
 */
const app = express();

/**
 * Middleware setup.
 * Apply JSON parsing to all incoming requests.
 * Enable Cross-Origin Resource Sharing (CORS).
 */
app.use(bodyParser.json());
app.use(cors());

/**
 * cookies API module.
 * @module api/cookies
 */
import router from './routes/cookies.js';

/**
 * Mounting the cookies router on the application.
 * All routes defined in the cookies router will be prefixed with '/api/cookies'.
 */
app.use('/api/cookies', router)

/**
 * Server listening port. Default is 5000.
 * @type {number}
 */
const port = process.env.PORT || 5000;

/**
 * Start the application server.
 */
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})