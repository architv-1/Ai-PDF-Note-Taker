
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageURL: v.string(),
  }),

  pdfFiles: defineTable({
    fileID: v.string(),
    storageID: v.string(),
    fileName: v.string(),
    fileURL: v.string(),
    createdBy: v.optional(v.string()),
  }),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768, // Changed from 1536 to 768 for Google embeddings
  }),
});