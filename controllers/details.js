import {Article} from "../config/database.js";

export const Details = (req, res) =>{
    // Il y a plusieurs articles, on récupère un paramètre id dans l'URL pour exécuter notre requête sur le bon article

    let id = req.params.id;

    Article.findOne({_id: id}, (error, post) =>{
        res.render("layout", {template: "article", post: post})
    })


}

export const AddComment = (req, res) => {
    let id = req.params.id

    // création de l'objet commentaire qui sera ajouté aux tableaux des commentaires
    let comment = {
        pseudo: req.body.pseudo,
        comment: req.body.content,
        date: new Date()
    }

    // Mise à jour de l'article avec le commentaire
    Article.updateOne({_id: id}, {$push: {comments: comment}}, ()=>{
        res.redirect("/article/"+id);
    })

}