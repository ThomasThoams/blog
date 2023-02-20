import { User } from "../config/database.js";
import bcrypt from "bcrypt"


export const Login = (req, res) =>{
    res.render("layout", {template: "login"})
}


export const LoginSubmit = (req, res) =>{

    // On va vérifier si l'utilisateur avec cet email existe en BDD ou pas
    User.findOne({email: req.body.email}, (err, admin) =>{
        console.log(admin);
        // Si il existe
        if(admin){
            bcrypt.compare(req.body.pwd, admin.password, (err, result) =>{
                // Si le mot de passe est correct alors on créé la session et on redirige l'utilisateur vers le BO
                if(result){
                    req.session.isAdmin = true; 
                    res.redirect("/admin")
                }
                // Sinon on affiche un message
                else{
                    res.render("layout", {template: "login", message: "Mauvais mot de passe"})
                }

            })
        }
        // Si l'utilisateur n'existe pas
        else{
            res.render("layout", {template: "login", message:"Email inconnu"})
        }
    })

}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
}