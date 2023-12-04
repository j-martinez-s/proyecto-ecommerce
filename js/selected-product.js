function getProductIdSelected() {
    return localStorage.getItem('selectedProduct');
}

function saveProductIdSelected(id){
    localStorage.setItem('selectedProduct', id);
}