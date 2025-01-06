


function pressLeft() { /*ce qui ce passe quand on appuie sur la fleche gauche*/
    let tgauche = document.querySelector(".car");
    let tgaucheR1 = document.querySelector(".roue1");
    let tgaucheR2 = document.querySelector(".roue2");
    let gauche = document.querySelector(".blocCar");
    tgauche.style.animation = "cleft 0.5s linear"; /*change l'annimation par defaut*/
    tgaucheR1.style.animation = "cleft 0.5s linear"; /*change l'annimation par defaut des roue*/
    tgaucheR2.style.animation = "cleft 0.5s linear"; /*change l'annimation par defaut des roue*/
    
    ValueLeft = getComputedStyle(gauche);/*prend le css de la class blocCar*/
    let coulisse = parseInt(ValueLeft.left, 10); /*prend la valeur dans left du css de blocCar et ne garde que les chiffres le 10 c'est pour dire que c'est un nombre en base 10*/
    anim = setInterval( function(){/*boucle toutes les miliseconde*/
        if (coulisse > -100  ){/*tant que ca ne dépasse par -100*/
                coulisse -= 5;

                gauche.style.left = coulisse + "px";/*change la valeur de left a chaque boucle*/
        }

    }, 1);/*toute les miliseconde*/
}

function pressRight() { /*ce qui ce passe quand on appuie sur la fleche droite*/
    let tdroite = document.querySelector(".car");
    let tdroiteR1 = document.querySelector(".roue1");
    let tdroiteR2 = document.querySelector(".roue2");
    let droite = document.querySelector(".blocCar");
    tdroite.style.animation = "cright 0.5s linear"; 
    tdroiteR1.style.animation = "cright 0.5s linear"; 
    tdroiteR2.style.animation = "cright 0.5s linear"; 

    ValueLeft = getComputedStyle(droite);
    let coulisse = parseInt(ValueLeft.left, 10); 
    anim = setInterval( function(){
        if (coulisse < 100 ){
                coulisse += 5;

                droite.style.left = coulisse + "px";
        }

    }, 1);
}


document.addEventListener("keydown", function(event){
    if (event.key === "ArrowLeft"){
        pressLeft();
    }else if(event.key === "ArrowRight"){
        pressRight();
    }
});


function accident() {/* si la voiture rouge touche une autre voiture */

    let jouer = document.querySelector(".blocCar").getBoundingClientRect();
    let ennemi = document.querySelector(".blocvoiture").getBoundingClientRect();

    return !(jouer.top > ennemi.bottom ||
        jouer.bottom < ennemi.top ||
        jouer.right < ennemi.left ||
        jouer.left > ennemi.right 
        
     );
}

let gameOver= false; /*pas encore perdu*/

document.addEventListener('DOMContentLoaded', (event) => {/*surveiller ce qu'il se passe*/

    setInterval(() => { /*verifie si les voiture se touche et si la partie est déjà perdu*/
        if (!gameOver && accident()){
            
            document.querySelector(".game").style.display ="none"
            document.querySelector(".gameover").style.display ="block"
            setInterval(() =>{
                alert("Appuie sur enter pour rejouer");
                location.reload(); /*recharge la page*/
            },2000);
            gameOver = true;
        }
    }, 100);
});



document.addEventListener('DOMContentLoaded', (event) => {/*positoin possible de ennemi */
    const ennemiVoiture = document.querySelector(".blocvoiture");
    const jouer = document.querySelector(".blocCar");
    let positionEnnemi = [-100, 100];
    let animEnCours = false;

    function changerPositionEnnemi() {
        let aleatoire = Math.floor(Math.random() * positionEnnemi.length);
        let ennemiLieu = positionEnnemi[aleatoire];
        let eCoulisse = parseInt(getComputedStyle(ennemiVoiture).left, 10);

        let animEnnemi = setInterval(() => { /*detecte quand il changer de position*/
            let jouerRect = jouer.getBoundingClientRect();
            let ennemiRect = ennemiVoiture.getBoundingClientRect();
            
            if (ennemiRect.bottom <= jouerRect.top - 300) {
                clearInterval(animEnnemi); /*stop l'annim*/
                eCoulisse = ennemiLieu; 
                ennemiVoiture.style.left = eCoulisse + "px";
                animEnCours = false; 
            } else {
                if (eCoulisse > ennemiLieu) {
                    eCoulisse -= 5;
                } else if (eCoulisse < ennemiLieu) {
                    eCoulisse += 5;
                }
                ennemiVoiture.style.left = eCoulisse + "px";
            }
        }, 10); /*vitesse*/ 
    }

    setInterval(() => {
        if (!animEnCours) {
            animEnCours = true;
            changerPositionEnnemi();
        }
    }, 1000); /* quand sa recommence*/
});
