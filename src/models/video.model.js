import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


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
    },
    views: {
        type: Number, // total number of views
        default: 0
    },
    isPublished: {
        type: Boolean, // publication status
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }

},
    { timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema); 