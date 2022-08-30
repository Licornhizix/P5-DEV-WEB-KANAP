//récupération de l'id de la commande et affichage
function confirm() {
    const urlparam = new URLSearchParams(window.location.search);
    const idproduct = urlparam.get('id');

    const idNode = document.getElementById("orderId");
    idNode.innerText = idproduct;
    //suppression du localstorage
    localStorage.clear();
}

confirm();