import { Router } from "express";
import bookController from "../controller/book.controller.js";

const bookRouter = Router();
const bookControl = new bookController();

bookRouter.get("/books", (req, res) => {
  const query = req.query;
  if (new Set(Object.entries(query)).size >= 1) {
    bookControl.getBooksByQueryController(req, res);
  } else {
    bookControl.getBooksController(req, res);
  }
});
bookRouter.post("/book", (req, res) => bookControl.postBookController(req, res));
bookRouter.get("/book/:id", (req, res) => bookControl.getBookController(req, res));
bookRouter.put("/book/:id", (req, res) => bookControl.updateBookController(req, res));
bookRouter.delete("/book/:id", (req, res) => bookControl.deleteBookController(req, res));
export default bookRouter;
