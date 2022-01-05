import assert from "assert";
import mongoose from "mongoose";
import { User } from "../users";
import { Comment } from "../comments";
import { BlogBook } from "../blogBooks";

describe("Test de middleware", () => {
  it("Test que les livres sont supprimés si le user est supprimé", (done) => {
    let user, blogBook, comment;

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
      user.remove().then(() => {
        BlogBook.count().then((count) => {
          assert(count === 0);
          done();
        });
      });
    });
  });
});
