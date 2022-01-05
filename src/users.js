import mongoose from "mongoose";
import { BlogBook } from "./blogBooks";
import { BookSchema } from "./books";
//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema Book constitué d'un titre de type String.
const UserSchema = new Schema({
  name: String,
  books: [BookSchema],
  blogBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogBook",
    },
  ],
});

UserSchema.virtual("countBooks").get(function() {
  return this.books.length;
});

UserSchema.pre("remove", function(next) {
  BlogBook.remove({ _id: { $in: this.blogBooks } }).then(() => {
    next();
  });
});

//Création d'un model de Book basée sur le Schema défini.
const User = mongoose.model("user", UserSchema);

//Exportation du model User pour pouvoir y accéder de l'exterieur.
export { User, UserSchema };
