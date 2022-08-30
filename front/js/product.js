//declaration des 2 constantes pour récuperer l'id dans l'url

const urlparam = new URLSearchParams(window.location.search);
const idproduct = urlparam.get('id');

//declaration d'une fonction pour récupérer un article à partir de son id product
async function getProducts() {
    fetch("http://localhost:3000/api/products/" + idproduct)
        .then(function (res) {
            if (res.ok) {
                console.log(res.json);
                return res.json();
            }
        })
        .then(function (product) {
            console.log(product);

            // Insertion des élements de la page produit

            const divproduct = document.getElementById('item__img'); //recupération d'un élements du dom à partir de son id
            var img = document.createElement('img');
            img.setAttribute("alt", product.name);
            img.src = product.imageUrl;
            divproduct.appendChild(img);

            var price = document.getElementById('price');
            price.insertAdjacentHTML('afterbegin', product.price)

            var name = document.getElementById('title');
            name.insertAdjacentHTML('afterbegin', product.name)

            var description = document.getElementById('description');
            description.insertAdjacentHTML('afterbegin', product.description)
            var colors = document.getElementById('colors');

            const buttonAjoutPanier = document.getElementById('addToCart');
            buttonAjoutPanier.addEventListener('click', ajoutPanier);


            for (color in product.colors) {
                var option = document.createElement('option');
                option.setAttribute("value", color);
                option.insertAdjacentHTML("afterbegin", product.colors[color])
                colors.appendChild(option);

            }


        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        })



}
getProducts(); //Appel de la fonction

/*Creation d'un objet qui recupere tout les elements requis*/

function ajoutPanier() {
    let name = document.getElementById('title').innerHTML;
    let colors = document.getElementById('colors');
    let numberproduct = document.getElementById('quantity').value;
    let selectColor = colors.options[colors.selectedIndex].text;

    /*On additionne les elements déja presents au panier en évitant une MAJ(ecrasement de données)*/
    let currentCart = JSON.parse(localStorage.getItem(idproduct + '' + selectColor))
    console.log(currentCart);
    if (currentCart) {

        numberproduct = parseInt(numberproduct) + parseInt(currentCart.numberproduct); /*CONVERSTION des chiffres en nombre entier pour eviter une concatenation*/
    }
    /*creation d'un objet avec les elements requis dans le LS*/

    let myproduct = {
        'id': idproduct,
        'name': name,
        'colors': selectColor,
        'numberproduct': numberproduct,
        'uk': idproduct + '' + selectColor
    }
    /*envoie des élements dans le local storage*/
    localStorage.setItem(idproduct + '' + selectColor, JSON.stringify(myproduct));
}