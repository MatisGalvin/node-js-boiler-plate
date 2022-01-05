import mongoose from "mongoose";
//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema Book constitué d'un titre de type String.
const UserSchema = new Schema({
  name: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

UserSchema.virtual("countBooks").get(function() {
  return this.books.length;
});
//Création d'un model de Book basée sur le Schema défini.
const User = mongoose.model("user", UserSchema);

//Exportation du model User pour pouvoir y accéder de l'exterieur.
export { User, UserSchema };
