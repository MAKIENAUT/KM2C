import { Schema, model, models, Document, Model, Types } from "mongoose";

interface IPost extends Document {
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  msg: {
    type: String,
    required: true
  }
}, { timestamps: true });

const PostModel: Model<IPost> = models.post || model<IPost>('post', postSchema);

export default PostModel;