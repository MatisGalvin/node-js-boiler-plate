import assert from "assert";
import mongoose from "mongoose";
import { User } from "../users";
import { Comment } from "../comments";
import { BlogBook } from "../blogBooks";

describe("Test sur les livres du users", () => {
  let user, blogBook, comment;

  beforeEach((done) => {
    user = new User({
      name: "Matis",
    });
    blogBook = new BlogBook({
      title: "Les Fourmis",
      summary: "Un livre qui parle des fourmis",
    });
    comment = new Comment({
      content: "Je kiff ptain",
    });

    user.blogBooks.push(blogBook);
    blogBook.comments.push(comment);
    comment.user = user;

    Promise.all([user.save(), blogBook.save(), comment.save()]).then(() => {
      done();
    });
  });

  it("Test les livres d un user", async () => {
    await User.findOne({ name: "Matis" })
      .populate("blogBooks")
      .then((user) => {
        assert(user.blogBooks[0].title === "Les Fourmis");
      });
  });

  it("Test les livres d un user", async () => {
    await User.findOne({ name: "Matis" })
      .populate({
        path: "blogBooks",
        populate: {
          path: "comments",
          // Particularité mongoose, on doit stipuler le modele à partir du deuxieme populate
          model: "comment",
        },
      })
      .then((user) => {
        assert(user.blogBooks[0].comments[0].content === "Je kiff ptain");
      });
  });
});
