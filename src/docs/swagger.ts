export const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "URL Shortener API",
    version: "1.0.0",
    description: "Simple API for creating short URLs, redirecting them, and viewing click stats.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "Service availability endpoints",
    },
    {
      name: "URLs",
      description: "Short link creation, redirect, and stats",
    },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Server status",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "OK" },
                    name: { type: "string", example: "URL Shortener API" },
                    message: { type: "string", example: "Server up and running" },
                  },
                  required: ["status", "name", "message"],
                },
              },
            },
          },
        },
      },
    },
    "/url/shorten": {
      post: {
        tags: ["URLs"],
        summary: "Create a shortened URL",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ShortenRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Short URL created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ShortenResponse",
                },
              },
            },
          },
          "400": {
            description: "Invalid request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/url/stats/{code}": {
      get: {
        tags: ["URLs"],
        summary: "Get stats for a shortened URL",
        parameters: [
          {
            name: "code",
            in: "path",
            required: true,
            description: "Short URL code",
            schema: {
              type: "string",
              example: "abc1234",
            },
          },
        ],
        responses: {
          "200": {
            description: "URL stats returned",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/StatsResponse",
                },
              },
            },
          },
          "404": {
            description: "URL not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/url/{code}": {
      get: {
        tags: ["URLs"],
        summary: "Redirect to the original URL",
        parameters: [
          {
            name: "code",
            in: "path",
            required: true,
            description: "Short URL code",
            schema: {
              type: "string",
              example: "abc1234",
            },
          },
        ],
        responses: {
          "302": {
            description: "Redirects to the original URL",
          },
          "404": {
            description: "URL not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ShortenRequest: {
        type: "object",
        properties: {
          url: {
            type: "string",
            format: "uri",
            example: "https://example.com/very/long/link",
          },
        },
        required: ["url"],
      },
      ShortenResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              code: { type: "string", example: "abc1234" },
            },
            required: ["code"],
          },
        },
        required: ["success", "data"],
      },
      StatsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              results: {
                $ref: "#/components/schemas/UrlEntry",
              },
            },
            required: ["results"],
          },
        },
        required: ["success", "data"],
      },
      UrlEntry: {
        type: "object",
        properties: {
          original: {
            type: "string",
            format: "uri",
            example: "https://example.com/very/long/link",
          },
          clicks: {
            type: "integer",
            minimum: 0,
            example: 3,
          },
        },
        required: ["original", "clicks"],
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "URL not found" },
        },
        required: ["success", "message"],
      },
    },
  },
};
