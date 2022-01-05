import assert from "assert";
import { User } from "../users";
import { Book } from "../books";

describe("Test du virtual type", () => {
  it("*** Test de virtual type count Books ***", async () => {
    const books = await Book.insertMany([
      new Book({ title: "Harry Potter" }),
      new Book({ title: "Lotro" }),
    ]);
    const user1 = new User({
      name: "Matis",
      books,
    });
    await user1.save();
    const userFound = await User.findOne({ name: "Matis" });
    assert(userFound.countBooks === 2);
  });
});
