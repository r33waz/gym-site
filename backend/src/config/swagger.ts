import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.config";

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
