import { BookModel } from "../models/user.model.js";

class bookService {
  constructor() {
    this.bookModel = BookModel;
  }
  async getBooks() {
    const data = await this.bookModel.find();
    if (data.length >= 1) {
      return data;
    } else {
      throw new Error("books-not-found");
    }
  }
  async postBook(body) {
    try {
      const data = await this.bookModel.create(body);
      return data;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw { status: 400, message: error.message };
      }
      throw { status: 500, message: "Internal server error" };
    }
  }
  async getBook(id) {
    const data = await this.bookModel.findOne({ _id: id });
    return data;
  }
  async updateBook(id, body) {
    const data = await this.bookModel.findOneAndUpdate({ _id: id }, { $set: { ...body } }, { returnDocument: "after" });
    return data;
  }
  async deleteBook(id) {
    const data = await this.bookModel.findOneAndDelete({ _id: id });
    return data;
  }
  async getBooksByQuery(queries) {
    const { name, author, year } = queries;
    if (name) {
      const data = await this.bookModel.find({ book_name: { $regex: name, $options: "i" } });
      if (data.length >= 1) {
        return data;
      } else {
        throw new Error("books-not-found");
      }
    } else if (author) {
      const data = await this.bookModel.find({ author: { $regex: author, $options: "i" } });
      if (data.length >= 1) {
        return data;
      } else {
        throw new Error("books-not-found");
      }
    } else if (year) {
      const data = await this.bookModel.find({ year: { $eq: year } });
      if (data.length >= 1) {
        return data;
      } else {
        throw new Error("books-not-found");
      }
    }
  }
}

export default bookService;
