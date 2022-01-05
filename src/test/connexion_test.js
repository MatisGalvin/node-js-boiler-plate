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

beforeEach("Supprime les données", (done) => {
  mongoose.connection.dropDatabase().then(() => {
    done();
  });
});
