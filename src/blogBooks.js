import mongoose from "mongoose";
//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema Book constitué d'un titre de type String.
const BlogBookSchema = new Schema({
  title: { type: String },
  summary: { type: String },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

//Création d'un model de Book basée sur le Schema défini.
const BlogBook = mongoose.model("blogBook", BlogBookSchema);

//Exportation du model Book pour pouvoir y accéder de l'exterieur.
export { BlogBook };
