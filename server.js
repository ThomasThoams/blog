import express from "express";
import session from "express-session";
import parseurl from "parseurl";
import router from "./routes/router.js";
const app = express();

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));


// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');


//pour l'utilisation du json à la réception des données formulaire
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded


// Initialisation du système de session
app.use(session({
	secret: "mySecret",
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}))

// protection des pages admin

app.use((req, res, next) => {

	let pathname = parseurl(req).pathname.split("/")

	let protectedPath = ["admin", "add_post", "delete_post", "edit_post"]

	// Si la session isAdmin n'existe pas et que l'URL fait des parties des URL protégées
	if(!req.session.isAdmin && protectedPath.includes(pathname[1])){
		 res.redirect("/")
	}else{
		next();
	}
})

// création de la variable local pour l'utilisation des sessions dans les templates EJS
app.use((req, res, next)=>{

	if(!req.session.isAdmin){
		res.locals.isAdmin = false;
	}else{
		res.locals.isAdmin = true;
	}

	next();
})

//appel du routeur
app.use('/', router);

// lancement du serveur sur un port choisi 

app.listen(5000, ()=>{
	console.log('listening port '+5000+' all is ok');
})