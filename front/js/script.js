async function getProducts() {
    fetch("http://localhost:3000/api/products/")
        .then(function (res) {
            if (res.ok) {
                console.log(res.json);
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value);
            const itemscontainer = document.getElementById('items');
            for (var product of value) {
                var nameproduct = document.createElement('h3');
                nameproduct.setAttribute("class", 'productName');
                nameproduct.innerText = product.name;
                var colorsproduct = document.createElement('h2');
                colorsproduct.innerText = product.colors;
                var divproduct = document.createElement('div');
                itemscontainer.appendChild(divproduct);
                divproduct.appendChild(nameproduct);
                itemscontainer.appendChild(colorsproduct);

            };
            /*           <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */

        })
        .catch(function (err) {
            // Une erreur est survenue
            console.log(err);
        })



}
/*async function displayProducts() {

    console.log(arrayProducts);
    for (var i = 0; i < arrayProducts.length; i++) {
        var nameproduct = document.createElement('h2');
        nameproduct.innerText = arrayProducts[i].name;
        itemscontainer.appendChild(nameproduct);
    }
}*/

getProducts();