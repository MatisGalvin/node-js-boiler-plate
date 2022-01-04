import assert from "assert";
import { Book } from "../books";
import { User } from "../users";

describe("Test du relation", () => {
  it("*** Test la taille de la liste des livres d'un user***", async () => {
    const books = await Book.insertMany([
      new Book({ title: "Harry Potter" }),
      new Book({ title: "Lotro" }),
    ]);

    await new User({
      name: "Matis",
      books,
    }).save();

    const userFound = await User.findOne({ name: "Matis" });
    assert(userFound.books.length == 2);
  });

  it("*** Ajout de livres à un user ***", async () => {
    const user1 = new User({
      name: "Matis",
    });
    user1.books.push(new Book({ title: "Seigneur des agneaux" }));
    await user1.save();
    const userFound = await User.findOne({ name: "Matis" });
    assert(userFound.books.length == 1);
  });

  it("*** Suppression de livres à un user ***", async () => {
    const books = await Book.insertMany([
      new Book({ title: "Harry Potter" }),
      new Book({ title: "Lotro" }),
    ]);
    const matis = await User.create({
      name: "Matis",
      books,
    });
    matis.books.shift();
    await matis.save();
    const users = await User.find({}).populate("books");
    assert(users[0].books[0].title === "Lotro");
  });
});
