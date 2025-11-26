// convex/ingest.js
"use node";

import { action } from "convex/server";

/**
 * This action dynamically imports langchain packages inside the handler.
 * That prevents the Convex bundler from trying to bundle Node-only modules
 * for the browser.
 */
export const ingest = action(async (ctx) => {
  // Dynamically import Node-only packages inside the Node action:
  const { ConvexVectorStore } = await import("@langchain/community/vectorstores/convex");
  const { GoogleGenerativeAIEmbeddings } = await import("@langchain/google-genai");
  const { TaskType } = await import("@google/generative-ai");

  await ConvexVectorStore.fromTexts(
    ["Hello world", "Bye bye", "What's this?"],
    [{ prop: 2 }, { prop: 1 }, { prop: 3 }],
    new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    }),
    { ctx } // pass Convex action context so helper functions can use DB
  );

  return { success: true };
});
