import express from 'express';
import mongoose from 'mongoose';
import TermModel from './models/Term.js';

const Term = TermModel(mongoose);
import appSrc from './app.js';

const DBURL = "mongodb+srv://glossary_reader:glossary_reader@cluster0.n7zyl.mongodb.net/mongodemo?retryWrites=true&w=majority";

try {
    await mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

    const app = appSrc(express, mongoose, Term);

    app.listen(process.env.PORT ?? 3000);
} catch (e) {
    console.log(e.codeName);
}