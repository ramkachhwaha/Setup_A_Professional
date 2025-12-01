import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String, // cloudinary, URL to the video file
        required: true,
    },
    thumbnail: {
        type: String, // cloudinary, URL to the video's thumbnail image
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // duration in seconds
        required: true
    }

},
    { timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema); 