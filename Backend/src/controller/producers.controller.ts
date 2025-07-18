import { type Request, type Response } from 'express';

import { fetchAwardInterval } from '../services/producers.service';


export async function awardInterval(req: Request, res: Response)
{
    try {
        const producers = await fetchAwardInterval();

        if (producers.min.length === 0 && producers.max.length === 0) {
            return res.status(404).send("We didn't find any producers :(");
        }

        return res.status(200).send(producers);
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

