import {Options} from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for the application",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/adapters/api/swagger/annotation/*.ts"],
};

export default swaggerOptions;
