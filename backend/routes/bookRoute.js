import express from 'express';
import multer from 'multer';
import path from 'path';
import Book from '../models/bookModel.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
// configure multer to save file in the 'uploads' directory

//Route for save a new book
router.post('/', upload.single('photo'), async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({message: 'Send all required fields: title, author, publishYear'});
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            photo: req.file ? req.file.path : null,
            description: req.body.description,
            // save file path if a photo is uploaded
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch(err){
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
});

// Route for get all books from database
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        }); 
    }catch(err){
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }
});
// Route for get single book from database by id
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book); 
    }catch(err){
        console.log(err.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route for update a book
router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, publishYear, description } = req.body;
      const photo = req.file ? req.file.path : null;
    //   const description = req.body.description;
  
      const updatedBook = {
        title,
        author,
        publishYear,
        description,
      };
  
      if (photo) {
        updatedBook.photo = photo;
      }
  
      const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
  
      return res.status(200).send(book);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  });

// Route for delete a book
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch(err){
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }
});

export default router;