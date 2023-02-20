import {Article} from "../config/database.js";

export default (req, res) => {

    Article.find((err, posts) =>{
        // j'appelle le template layout
        res.render("layout", {template: "home", posts: posts})
    })


}