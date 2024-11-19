import {Router} from 'express';
import {HealthController} from "../controllers/HealthController";

const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get('/health', healthController.healthCheck);

export default healthRouter;
