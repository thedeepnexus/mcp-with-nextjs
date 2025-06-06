import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "courseRecommender",
      "Give a course recommendation based on the user's interests",
      {
        experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
      },
      ({ experienceLevel }: { experienceLevel: "beginner" | "intermediate" | "advanced" }) => ({
        content: [
          {
            type: "text",
            text: `I recommend you take the ${
              experienceLevel === "beginner"
                ? "beginner for JavaScript"
                : experienceLevel === "intermediate"
                ? "intermediate for Python"
                : "advanced for Machine Learning"
            }  course. It will help you build a strong foundation in programming and data science.`,
          },
        ],
      })
    );    
  },
  {
    capabilities: {
      tools: {
        courseRecommender: {
          description:
            "Give a course recommendation based on the user's interests",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
