//async function getProducts() {}
let currentCart = localStorage.getItem('produit');
let cartJson = JSON.parse(currentCart);

console.log(cartJson.name);


async function getProducts() {
  for (indexItem in cartJson) {
    console.log(indexItem);
    let idproduct = cartJson[indexItem].id
    fetch("http://localhost:3000/api/products/" + idproduct)
      .then(function (res) {
        if (res.ok) {
          console.log(res.json);
          return res.json();
        }
      })
      .then(function (product) {
        console.log(product);

        /*
        Recuperer le prix, l'image, et les containers
        
        */
        const itemscontainer = document.getElementsById('cart__items');


        var img = document.createElement('img');
        img.setAttribute("alt", product.name);
        img.src = product.imageUrl;
        itemscontainer.appendChild(img);

        var price = document.getElementById('price');
        price.insertAdjacentHTML('afterbegin', product.price)

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
      })
      .catch(function (err) {
        // Une erreur est survenue
        console.log(err);
      })

  }

}
getProducts();



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