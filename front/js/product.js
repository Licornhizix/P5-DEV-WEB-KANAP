const urlparam = new URLSearchParams(window.location.search);
const idproduct = urlparam.get('id');



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

            const divproduct = document.getElementById('item__img');
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
getProducts();

/*Creation d'un objet qui recupere tout les elements requis*/

function ajoutPanier() {
    let name = document.getElementById('title').innerHTML;
    let colors = document.getElementById('colors');
    let numberproduct = document.getElementById('quantity').value;
    let selectColor = colors.options[colors.selectedIndex].text;
    /*idproduct*/



    /*On additionne les elements déja presents au panier en évitant une MAJ(ecrasement de données)*/
    let currentCart = JSON.parse(localStorage.getItem('produit', 'uk:' + idproduct + '' + selectColor))
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
    localStorage.setItem('produit', JSON.stringify(myproduct));


}
/*produits à enregister dans le localStorage*/

/*let produitaStockerdansLs = JSON.parse(localStorage.getItem("produit")); /*converstion de l'objet en JSON pour le local storage*/

/*console.log(produitaStockerdansLs);*/

/* si des produits sont déjà dans le LS*/

/*if (produitaStockerdansLs) {


}*/
/* si pas de produits  dans le LS*/
/*else {
    produitaStockerdansLs = [];

    produitaStockerdansLs.push(colors) /*pour envoyer les infos dans un tableau*/

/*console.log(produitaStockerdansLs);

}
*/