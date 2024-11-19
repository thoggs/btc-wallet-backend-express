import {Request, Response} from 'express';

export class HealthController {
    healthCheck(_: Request, res: Response) {
        res.send('Server is running');
    }
}
