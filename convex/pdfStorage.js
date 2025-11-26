import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileToDB = mutation({
  args: v.object({
    fileID: v.string(),
    storageID: v.string(),
    fileName: v.string(),
    fileURL:v.string(),
    createdBy: v.optional(v.string()), // ✔ must match schema
  }),

  handler: async (ctx, args) => {
    await ctx.db.insert("pdfFiles", {
      fileID: args.fileID,
      fileName: args.fileName,
      storageID: args.storageID,
      fileURL:args.fileURL,
      createdBy: args.createdBy ?? null, // ✔ safe
    });

    return "Inserted PDF Successfully...";
  },
});


export const getFileURL = mutation({
  args: v.object({
    storageID: v.string()
  }),
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageID);
    return url;
  }
});