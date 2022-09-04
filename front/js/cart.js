//Définition du Localstorage
let currentCart = JSON.stringify(localStorage);
let cartJson = JSON.parse(currentCart);

console.log(cartJson.name);

//déclaration containere pour insertions des produits dans le panier
let itemscontainer = document.getElementById('cart__items');
async function getProducts() {
  let quantityTotal = 0; //création de 2 variables pour la gestion de l'affichage des quantités restantes dans le panier
  let priceTotal = 0;

  for (indexItem in cartJson) {
    console.log(indexItem);

    //recuperation des élements pour les disposer dans les lignes du panier
    let currentProduct = JSON.parse(localStorage.getItem(indexItem));
    console.log(currentProduct.id);
    let idproduct = currentProduct.id;
    //On demande à l'Api le produit pour récuperer le prix
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


        // Suppression d'un produit

        function deleteProduct() {
          let buttonSupprimer = document.querySelectorAll(".deleteItem");


          //création d'une boucle avec écouteurs d'évenements qui nous permet via le btn supprimer de choisir la bonne ligne à supprimer.
          for (let i = 0; i < buttonSupprimer.length; i++) {
            buttonSupprimer[i].addEventListener("click", (event) => {
              event.preventDefault();
              console.log(event);
              localStorage.removeItem(localStorage.getItem(localStorage.key(i)).id + localStorage.getItem(localStorage.key(i)).colors);

              //Alerte produit supprimé et rafraichissement page
              alert("Ce produit a bien été supprimé du panier");

            })
          }
        }


        productDivsetting.appendChild(productDivQuant);
        productDivsetting.appendChild(productDivDelete);


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
              if (currentCart.length < 1) {
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
              let currentCart = localStorage.getItem(localStorage.key(i));
              let cartJson = JSON.parse(currentCart);

              qttModif[i].addEventListener("change", (event) => {
                event.preventDefault();

                //Selection de l'element à modifier en fonction de son id ET sa couleur

                console.log(qttModif[i].value);
                let qttModifValue = qttModif[i].value;

                //const resultFind = cartJson.find((el) => el.numberproduct !== quantityModif);

                //resultFind.quantiteProduit = numberproduct;
                cartJson.numberproduct = qttModifValue;

                localStorage.setItem(cartJson.uk, JSON.stringify(cartJson));

              })

            }
          }
          modifyQtt();

          ////////////////////////////////FORMULAIRE DE CONTACT

          //Récupération des coordonnées du formulaire client
          const inputName = document.getElementById('firstName');
          const inputLastName = document.getElementById('lastName');
          const inputAdress = document.getElementById('address');
          const inputCity = document.getElementById('city');
          const inputMail = document.getElementById('email');

          const errorinputName = document.getElementById("firstNameErrorMsg");
          const errorinputLastName = document.getElementById("lastNameErrorMsg");
          const errorinputAdress = document.getElementById("addressErrorMsg");
          const errorinputCity = document.getElementById("cityErrorMsg");
          const errorinputMail = document.getElementById("emailErrorMsg");

          //Stockage des valeurs rentrées par l'utilisateur dans le formulaire

          let valueName, valueLastName, valueAdress, valueCity, valueMail;

          //Stockage des REGEX dans des varibles

          let re = /^([a-zA-Z \-]+)$/;
          let reAdress = /^([a-zA-Z0-9 \-]+)$/;
          let reEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

          inputName.addEventListener("input", function (e) {
            valueName = inputName.value;
            //champs prenom debut
            if (valueName.length > 2 && re.test(valueName)) {
              errorinputName.innerText = "";
              console.log(valueName);
              inputName.style.backgroundColor = "green";
            } else {
              errorinputName.innerText = "Veuillez remplir correctement ce champs";
              console.log('rien');
              inputName.style.backgroundColor = "red";
            }
          })
          //champs prenom fin

          //champ nom début
          inputLastName.addEventListener("input", function (e) {
            valueLastName = inputLastName.value;
            //let re = /^([a-zA-Z \-]+)$/;
            if (valueLastName.length > 2 && re.test(valueLastName)) {
              errorinputLastName.innerText = "";
              console.log(valueLastName);
              inputLastName.style.backgroundColor = "green";
            } else {
              errorinputLastName.innerText = "Veuillez remplir correctement ce champs";
              console.log('rien');
              inputName.style.backgroundColor = "red";
            }

          })
          //champ nom fin

          //champ adress début

          inputAdress.addEventListener("input", function (e) {
            valueAdress = inputAdress.value;
            //let re = /^([a-zA-Z \-]+)$/;
            if (valueAdress.length > 2 && reAdress.test(valueAdress)) {
              errorinputAdress.innerText = "";
              console.log(valueAdress);
              inputAdress.style.backgroundColor = "green";
            } else {
              errorinputAdress.innerText = "Veuillez remplir correctement ce champs";
              console.log('rien');
              inputAdress.style.backgroundColor = "red";
            }

          })

          //champ adress fin

          //champ City début

          inputCity.addEventListener("input", function (e) {
            valueCity = inputCity.value;
            //let re = /^([a-zA-Z \-]+)$/;
            if (valueCity.length > 2 && reAdress.test(valueCity)) {
              errorinputCity.innerText = "";
              console.log(valueCity);
              inputCity.style.backgroundColor = "green";
            } else {
              errorinputCity.innerText = "Veuillez remplir correctement ce champs";
              console.log('rien');
              inputCity.style.backgroundColor = "red";
            }

          })

          //champ City fin

          //champ Email début

          inputMail.addEventListener("input", function (e) {
            valueMail = inputMail.value;

            if (valueMail.length > 2 && reEmail.test(valueMail)) {
              errorinputMail.innerText = "";
              console.log(valueMail);
              inputMail.style.backgroundColor = "green";
            } else {
              errorinputMail.innerText = "Veuillez remplir correctement ce champs";
              console.log('rien');
              inputMail.style.backgroundColor = "red";
            }

          })

          //champ Email fin

          const formCommander = document.querySelector('.cart__order__form');
          console.log(formCommander);
          formCommander.addEventListener('submit', function (e) {
            e.preventDefault();
            if (inputName.style.backgroundColor == "green" &&
              inputLastName.style.backgroundColor == "green" &&
              inputAdress.style.backgroundColor == "green" &&
              inputCity.style.backgroundColor == "green" &&
              inputMail.style.backgroundColor == "green") {
              console.log("envoyer");

              //création d'un objet contact à partir des données renseignées dans le formulaire de contact
              let contact = {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,

              }
              //récupération des id de nos produits
              let data = JSON.parse(currentCart)._id || [];
              //Objet qui stock avant l'envoie les données contacts et data
              let send = {
                contact: contact,
                products: data,
              }
              //Création du paquet via la méthode POST
              const promise = {
                method: 'POST',
                body: JSON.stringify(send),
                headers: {
                  'Content-Type': 'application/json',
                }
              }
              console.log(contact);
              //Envoie du paquet via le fetch
              fetch("http://localhost:3000/api/products/order", promise)
                .then(response => response.json())
                .then(data => {
                  //localStorage.setItem('orderId', data.orderId);
                  //redirection vers la page comrimation avec pour paramètre l'order id de l'api
                  document.location.href = 'confirmation.html?id=' + data.orderId;
                });
            }
          });

        };


        let spanQuantity = document.getElementById('totalQuantity'); // 
        spanQuantity.innerText = quantityTotal;
        let spanPrice = document.getElementById('totalPrice')
        spanPrice.innerText = priceTotal;
      })

      .catch(function (err) {
        // Une erreur est survenue
        console.log(err);
      })

  }

}
getProducts();