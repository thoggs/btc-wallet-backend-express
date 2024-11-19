import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import apiRouter from "./adapters/api/routes/api";
import healthRouter from "./adapters/api/routes/health";
import authRouter from "./adapters/api/routes/auth";
import responseFormatter from "./adapters/api/middleware/responseFormatter";
import errorHandler from "./adapters/api/middleware/errorHandler";
import passport from "./bootstrap/passport";
import authenticateJwt from "./adapters/api/middleware/auth";
import App from "./bootstrap/app";
import swaggerOptions from "./adapters/api/swagger/swaggerOptions";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(responseFormatter);
app.use('/api', authenticateJwt, apiRouter);
app.use('/auth', authRouter);
app.use('/', healthRouter);
app.use(errorHandler);

const appBootstrap = new App(app, port);

appBootstrap.initialize().then();