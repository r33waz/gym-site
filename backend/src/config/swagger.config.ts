import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym Management API",
      version: "1.0.0",
      description: "API Documentation",
    },

    servers: [
      {
        url: "http://localhost:8080/api/v1",
      },
    ],

    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Users", description: "System Users Management" },
      { name: "Members", description: "Gym Members" },
      { name: "Trainers", description: "Trainer Management" },
      { name: "Attendance", description: "Attendance Tracking" },
      { name: "Plans", description: "Membership Plans" },
      { name: "Payments", description: "Payment Management" },
      { name: "Classes", description: "Gym Classes" },
      { name: "Bookings", description: "Class Booking System" },
      { name: "Equipment", description: "Gym Equipment" },
      { name: "Reports", description: "Analytics & Reports" },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken", // <-- your cookie name
        },
      },
    },

    security: [
      {
        cookieAuth: [],
      },
    ],
  },

  // ⭐ THIS MAKES SWAGGER DYNAMIC
  apis: ["src/modules/**/*.ts", "src/DTO/**/*.ts", "src/entities/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
