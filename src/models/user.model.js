import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    book_name: {
      type: String,
      required: true,
      minLength: [0, "Kitob nomining uzunligi 0 dan katta bo'lishi kerak"],
      maxLength: [20, "Kitob nomining uzunligi 20 dan kichik bo'lishi kerak"],
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      minLength: [0, "Muallif ismining uzunligi 0 dan katta bo'lishi kerak"],
      maxLength: [20, "Muallif ismining uzunligi 20 dan kichik bo'lishi kerak"],
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: [1000, "Kitob chop etilgan yil 1000 dan katta bo'lishi kerak"],
      max: [new Date().getFullYear(), `Kitobning chop etilgan yili hozirgi ${new Date().getFullYear()}-yildan katta bo'masligi kerak`],
    },
    pages: {
      type: Number,
      required: true,
      min: [0, "Kitob sahifalari 0 dan katta bo'lishi kerak"],
      max: [2000, "Kitob sahifalari 2000 dan kichik bo'lishi kerak"],
    },
    duplicate: {
      type: Number,
      required: true,
      min: [0, "Nusxalar soni 0 dan katta bo'lishi kerak"],
    },
  },
  {
    versionKey: false,
  }
);

export const BookModel = mongoose.model("books", bookSchema);
