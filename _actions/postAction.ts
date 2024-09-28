'use server'

import { Types } from 'mongoose';
import PostModel from "../models/postModel";
import connectDB from "../config/database";

interface IPost {
  _id: Types.ObjectId;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  _id: Types.ObjectId;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GetPostsResponse {
  msg?: string;
  data?: Post[];
  errMsg?: string;
}

export async function getPosts(): Promise<GetPostsResponse> {
  try {
    const connected = await connectDB();
    if (!connected) {
      throw new Error("Failed to connect to the database");
    }
    const data = await PostModel.find();
    console.log("Posts retrieved:", data);
    
    // Convert Mongoose documents to Post interface
    const posts: Post[] = data.map(doc => ({
      _id: doc._id as Types.ObjectId,
      msg: doc.msg,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }));

    return { msg: 'GET', data: posts };
  } catch (error) {
    console.error("Error in getPosts:", error);
    return { errMsg: (error as Error).message };
  }
}