// Récupération des articles de l'API
async function getProducts() {
    fetch("http://localhost:3000/api/products/")
        .then(function (res) {
            if (res.ok) {
                console.log(res.json);
                return res.json();
            }
        })
        // Insertion des données de l'API dans le DOM
        .then(function (value) {
            console.log(value);

            // Insertion des élements de la page accueil
            const itemscontainer = document.getElementById('items');
            for (var product of value) {

                var nameproduct = document.createElement('h3');
                nameproduct.setAttribute("class", 'productName');
                nameproduct.innerText = product.name;
                var articleproduct = document.createElement('article');
                var link = document.createElement('a');
                link.setAttribute("href", './product.html?id=' + product._id); /*essai pour normaliser la premiere carte */
                itemscontainer.appendChild(link);
                itemscontainer.appendChild(articleproduct);
                articleproduct.appendChild(nameproduct);
                var img = document.createElement('img');
                img.src = product.imageUrl;
                articleproduct.appendChild(img);
                var paragraphe = document.createElement('p');
                paragraphe.setAttribute("class", 'productDescription');
                paragraphe.innerText = product.description;
                articleproduct.appendChild(paragraphe);
                link.appendChild(articleproduct, nameproduct, img, paragraphe);

            };
        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        })

}
//Appel de la fonction
getProducts();