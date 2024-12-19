import bookService from "../service/book.service.js";

class bookController {
  constructor() {
    this.bookService = new bookService();
  }
  async getBooksController(req, res) {
    try {
      const data = await this.bookService.getBooks();
      res.statusCode = 200;
      res.send({
        message: "Books found",
        books: data,
      });
    } catch ({ message }) {
      if (message === "books-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Books not found",
          books: null,
        });
      }
    }
  }
  async postBookController(req, res) {
    try {
      const body = req.body;
      const data = await this.bookService.postBook(body);
      if (data) {
        res.statusCode = 201;
        res.send({
          message: "Book posted",
          success: true,
        });
      }
    } catch (error) {
      res.statusCode = error.status;
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
  async getBookController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.bookService.getBook(id);
      res.statusCode = 200;
      res.send(data);
    } catch (error) {
      res.statusCode = 404;
      res.send({
        message: error.message,
      });
    }
  }
  async updateBookController(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await this.bookService.updateBook(id, body);
      if (data) {
        res.statusCode = 200;
        res.send({
          message: "Book successfully updated",
          success: true,
        });
      }
    } catch (error) {
      res.statusCode = 400;
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
  async deleteBookController(req, res) {
    try {
      const { id } = req.params;
      const data = await this.bookService.deleteBook(id);
      if (data) {
        res.statusCode = 200;
        res.send({
          message: "Book successfully deleted",
          success: true,
        });
      }
    } catch (error) {
      res.statusCode = 404;
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
  async getBooksByQueryController(req, res) {
    try {
      const query = req.query;
      const data = await this.bookService.getBooksByQuery(query);
      res.statusCode = 200;
      res.send({
        message: "Books found",
        success: true,
        books: data,
      });
    } catch (error) {
      if (error.message === "books-not-found") {
        res.statusCode = 404;
        res.send({
          message: "Books not found",
          success: false,
        });
      } else {
        res.statusCode = 500;
        res.send({
          message: error.message,
          success: false,
        });
      }
    }
  }
}
export default bookController;
