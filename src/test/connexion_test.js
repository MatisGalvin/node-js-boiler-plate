// librairie pour discuter avec mongodb en js
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
// Ne passera pas a la suite si ce n'est pas fait.
before((done) => {
  mongoose.connect("mongodb://localhost/books_test");
  mongoose.connection
    .once("open", () => done())
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

beforeEach(
  "Supprime les anciens livres et les anciens users avant chaque tests",
  (done) => {
    const { books, users } = mongoose.connection.collections;
    books.drop(() => {
      users.drop(() => {
        done();
      });
    });
  }
);
