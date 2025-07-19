import * as producersControllers from '../controller/producers.controller'
import express from 'express'


const producersRouter = express.Router();

/**
 * @openapi
 * /producers/award-interval:
 *   get:
 *     summary: Obtain the producer with the longest interval between two consecutive awards,
 *              and the one who obtained two awards the fastest
 *     tags:
 *       - Producers
 *     responses:
 *       200:
 *         description: An object with the producers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
producersRouter.get('/award-interval', producersControllers.awardInterval)

export {producersRouter}
