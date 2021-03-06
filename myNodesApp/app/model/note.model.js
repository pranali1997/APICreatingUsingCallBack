const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: {
        type: String
    },
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('note', NoteSchema);