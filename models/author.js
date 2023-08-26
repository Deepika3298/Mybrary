const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        console.log("In pre function")

        const books = await Book.find({ author: this.id })
        if (books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
})


// authorSchema.pre('deleteOne', async function(next) {
//     try {
//         const query = this.getFilter();
//         const hasBooks = await Book.exists({
//             author: query._id 
//         });

//         if (hasBooks) {
//             next(new Error('This author still has books.'));
//         } else {
//             next();
//         }
//     } catch (err) {
//         next(err);
//     }
// });


module.exports = mongoose.model('Author', authorSchema)