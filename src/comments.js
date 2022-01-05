import mongoose from "mongoose";
//Instanciation de l'objet permettant de definir un schéma.
const Schema = mongoose.Schema;

//Création d'un schema Book constitué d'un titre de type String.
const CommentSchema = new Schema({
  content: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

//Création d'un model de Book basée sur le Schema défini.
const Comment = mongoose.model("comment", CommentSchema);

//Exportation du model Book pour pouvoir y accéder de l'exterieur.
export { Comment };
