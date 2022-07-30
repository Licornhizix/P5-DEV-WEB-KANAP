//Définition du Localstorage
let currentCart = JSON.stringify(localStorage);
let cartJson = JSON.parse(currentCart);

console.log(cartJson.name);

let itemscontainer = document.getElementById('cart__items');
async function getProducts() {
  let quantityTotal = 0; //création de 2 variables pour la gestion de l'affichage des quantités restantes dans le panier
  let priceTotal = 0;

  for (indexItem in cartJson) {
    console.log(indexItem);

    let currentProduct = JSON.parse(localStorage.getItem(indexItem));
    console.log(currentProduct.id);
    let idproduct = currentProduct.id;
    fetch("http://localhost:3000/api/products/" + idproduct)
      .then(function (res) {
        if (res.ok) {
          console.log(res.json);
          return res.json();
        }
      })
      .then(function (product) {
        console.log(product);




        //création d'un élément

        let article = document.createElement('article'); //declaration variable avant de créé element
        article.setAttribute('class', 'cart__item'); //definition des attributs (1 attribut/ligne)
        article.setAttribute('data-id', currentProduct.id);
        article.setAttribute('data-color', currentProduct.colors);
        itemscontainer.appendChild(article); //insertion de l'enfant article ds élement parent(section)

        //div englobant l'image
        let productDivImg = document.createElement('div'); //declaration variable avant de créé plusieurs elements div 
        productDivImg.setAttribute('class', 'cart__item__img'); //definition des attributs (1 attribut/ligne)
        article.appendChild(productDivImg);

        //image
        var img = document.createElement('img');
        img.setAttribute("alt", product.name);
        img.src = product.imageUrl;
        productDivImg.appendChild(img);

        //div englobant le div de la description
        let productDivlook = document.createElement('div');
        productDivlook.setAttribute('class', 'cart__item__content');
        article.appendChild(productDivlook);

        //div la description
        let productDivunder = document.createElement('div');
        productDivunder.setAttribute('class', 'cart__item__content__description');
        productDivlook.appendChild(productDivunder);

        //a la fin, declaration via appendchild des enfants directs

        //description : le nom

        let name = document.createElement('h2');
        name.insertAdjacentHTML('afterbegin', product.name)
        productDivunder.appendChild(name);

        //description : la couleur ???

        let colors = document.createElement('p');
        colors.insertAdjacentHTML('afterbegin', currentProduct.colors)
        productDivunder.appendChild(colors);

        //description : le prix 

        let price = document.createElement('p');
        price.insertAdjacentHTML('afterbegin', product.price)
        productDivunder.appendChild(price);


        //div englobant les paramètres 
        let productDivsetting = document.createElement('div');
        productDivsetting.setAttribute('class', 'cart__item__settings');
        article.appendChild(productDivsetting);

        //div englobant les paramètres quantité 

        let productDivQuant = document.createElement('div');
        productDivQuant.setAttribute('class', 'cart__item__settings__quantity');
        let productDivDelete = document.createElement('div');
        productDivDelete.setAttribute('class', 'cart__item__content__settings__delete');



        let deletp = document.createElement('p');
        deletp.insertAdjacentText('afterbegin', 'Supprimer'); //Mise en place d'un eventlistener sur le bouton supprimer
        deletp.setAttribute('class', 'deleteItem');
        deletp.setAttribute('data-id', currentProduct.id);
        deletp.setAttribute('data-color', currentProduct.colors);
        productDivDelete.appendChild(deletp);
        /* const buttonSupprimer = document.getElementById('addToCart'); //il faut créer une fonction supp ds le LS
         buttonSupprimer.addEventListener('click', ajoutPanier); //Je ne sais pas si le addeventlistener est obligatoire ici?

          */

        // Suppression d'un produit
        function deleteProduct() {
          let buttonSupprimer = document.querySelectorAll(".deleteItem");


          //for (indexItem of cartJson) {


          for (let i = 0; i < buttonSupprimer.length; i++) {
            buttonSupprimer[i].addEventListener("click", (event) => {
              event.preventDefault();
              console.log(event);
              localStorage.removeItem(localStorage.getItem(localStorage.key(i)).id + localStorage.getItem(localStorage.key(i)).colors);
              //Selection de l'element à supprimer en fonction de son nom ET sa couleur

              /*let product = JSON.parse(localStorage.getItem(localStorage.key(i)));
              console.log(product);
              /*let nameDelete = product.name;
              let colorDelete = product.colors;
              let newcartJson;
              for (let y = 0; y < localStorage.length; y++) {

                if () !== product) {
                  newcartJson += localStorage.getItem(localStorage.key(y));
                  console.log(localStorage.getItem(localStorage.key(y)));
                }
                console.log(localStorage.getItem(localStorage.key(y)));
                localStorage.setItem(localStorage.getItem(localStorage.key(y)).key, newcartJson);
              }*/
              /* cartJson = cartJson.filter(el => localStorage.getItem(el) !== product);
              console.log(cartJson);
              localStorage.setItem("produit", JSON.stringify(cartJson));
*/
              //Alerte produit supprimé et rafraichissement page
              alert("Ce produit a bien été supprimé du panier");
              //location.reload();
            })
          }
        }
        //deleteProduct();



        productDivsetting.appendChild(productDivQuant);
        productDivsetting.appendChild(productDivDelete);
        //créer texte QTE avant le input <p>

        //Input 

        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', 1);
        input.setAttribute('max', 100);
        input.setAttribute('value', currentProduct.numberproduct);
        productDivQuant.appendChild(input);
        quantityTotal += parseInt(currentProduct.numberproduct); // quantityTotal = currentProduct.numberproduct + quantityTotal
        priceTotal += parseInt(currentProduct.numberproduct) * parseInt(product.price);



        //creation d'une fontion pour modifier quantité dans le panier localStorage.setItem

        // DEBUT DE LA SUPPRESSION ___________________________________________________________
        deleteItem();


        function deleteItem() {
          //récupération du bouton supprimer
          const deletedButton = document.querySelectorAll(".deleteItem"); //recupération des boutons 
          deletedButton.forEach((items) => { //items désigne chaque occurence (chaque boutons supprimer)
            items.addEventListener("click", () => {
              var currentCart = [],

                keys = Object.keys(localStorage),
                i = keys.length;
              while (i--) {
                currentCart.push(localStorage.getItem(keys[i])); //pour envoyer les données ds le tableau vide au dessus
              }
              console.log(currentCart);
              console.log(currentCart.length);
              if (currentCart.length == 1) {
                localStorage.clear();
                window.location.href = "index.html" //renvoi à la page accueil
              } else { //si plus d'1 produit 
                console.log(currentCart);
                for (let i = 0; i < currentCart.length; i++) { //on boucle sur les produits dans le panier (current cart)
                  let currentItems = JSON.parse(currentCart[i]);
                  console.log(items.dataset.id);
                  if (currentItems.id == items.dataset.id && currentItems.colors == items.dataset.color) { // si l'id et la couleur du produit corrspond à l'id et la couleur du btn supprimer 
                    localStorage.removeItem(currentItems.id + "" + currentItems.colors); //on supprime le produit
                    window.location.href = "cart.html";
                  }
                }

              };
            })
          })


          function modifyQtt() {
            let qttModif = document.querySelectorAll(".itemQuantity"); //récupération des quantités

            for (let i = 0; i < qttModif.length; i++) {
              qttModif[k].addEventListener("change", (event) => {
                event.preventDefault();

                //Selection de l'element à modifier en fonction de son id ET sa couleur
                let quantityModif = currentCart[i].quantiteProduit;
                let qttModifValue = qttModif[i].numberproduct;

                const resultFind = currentCart.find((el) => el.qttModifValue !== quantityModif);

                resultFind.quantiteProduit = qttModifValue;
                produitLocalStorage[i].quantiteProduit = resultFind.quantiteProduit;

                localStorage.setItem("produit", JSON.stringify(currentCart));

                // Rafraichissement page
                window.location.href = "cart.html";
              })
            }
          }
          modifyQtt();

        };


        // FIN DE LA SUPRESSION ___________________________________________________________________________



        /*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
              <div class="cart__item__img">
                <img src="../images/product01.jpg" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>Nom du produit</h2>
                  <p>Vert</p>
                  <p>42,00 €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article> -->

            */

        /*var img = document.createElement('img');
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

       */
        let spanQuantity = document.getElementById('totalQuantity'); // 
        spanQuantity.insertAdjacentText('afterbegin', quantityTotal);
        let spanPrice = document.getElementById('totalPrice')
        spanPrice.insertAdjacentText('afterbegin', priceTotal);
      })

      .catch(function (err) {
        // Une erreur est survenue
        console.log(err);
      })

  }

}
getProducts();