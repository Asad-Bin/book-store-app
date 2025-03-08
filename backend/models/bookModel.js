import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author : {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
        photo : {
            type: String, // need to add photo url
            required: false
        },
        description : {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;