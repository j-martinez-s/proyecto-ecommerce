const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/";

const container = document.getElementById("products-list");
const categoryTitle = document.getElementById('category-title')
const searchInput = document.getElementById("searchV");

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_PRICE = "Precio";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let FILTERED_ARRAY = [];
let COPY_ARRAY = [];

function showCategoryName(name) {
  categoryTitle.innerText = name;
}

function showProducts() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
      ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
      htmlContentToAppend += `
        <div class="col-6 col-md-4">
           <div class="card mb-4">
             <img src="${product.image}" class="card-img-top p-1" alt="Foto ${product.name}">
             <div class="card-body">
               <h5 class="card-title">${product.name}  USD ${product.cost}</h5>
               <p class="card-text ellipsis">${product.description}</p>
               <p class="soldCount">Vendidos ${product.soldCount}</p>
               <a href="#" class="btn btn-primary"  onclick="selectProduct('${product.id}')">Ver Detalles</a>
             </div>
           </div>
        </div>`;
    }
  }

  container.innerHTML = htmlContentToAppend;
}

function showEmptyCategoryMessage() {
  container.innerHTML = '<h4>No hay productos en esta categoría</h4>';
}

function getCategoryId() {
  return localStorage.getItem('catID');
}

document.getElementById("clearRangeFilter").addEventListener("click", function () {
  document.getElementById("rangeFilterPriceMin").value = "";
  document.getElementById("rangeFilterPriceMax").value = "";

  minPrice = undefined;
  maxPrice = undefined;

  showProducts();
});

document.getElementById("rangeFilterPrice").addEventListener("click", function () {
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minPrice = document.getElementById("rangeFilterPriceMin").value;
  maxPrice = document.getElementById("rangeFilterPriceMax").value;

  if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
    minPrice = parseInt(minPrice);
  }
  else {
    minPrice = undefined;
  }

  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
    maxPrice = parseInt(maxPrice);
  }
  else {
    maxPrice = undefined;
  }

  showProducts();
});


document.addEventListener("DOMContentLoaded", function () {
  const catId = getCategoryId();
  fetch(DATA_URL + catId + '.json')
    .then(response => response.json())
    .then(data => {
      showCategoryName(data.catName);
      if (data.products.length > 0) {
        currentProductsArray = data.products;
        COPY_ARRAY = data.products;
        showProducts();
        // busqueda de productos
        searchInput.addEventListener("input", () => {
          const searchTerm = searchInput.value.toLowerCase();

          if (!searchTerm) {
            currentProductsArray = COPY_ARRAY;
            return showProducts();

          } else {

            const filteredProducts = currentProductsArray.filter(product =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm)
            );

            if (filteredProducts.length > 0) {
              currentProductsArray = filteredProducts;
              showProducts();
            } else {
              currentProductsArray = COPY_ARRAY;
              container.innerHTML =
                `<div class= notFound> <p>No se encontraron resultados</p> </div>`;
            }
          }
        });
        return true;
      }
      showEmptyCategoryMessage();
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

const ORDER_ASC_BY_PRICE = "asc";
const ORDER_DESC_BY_PRICE = "desc";
const ORDER_BY_PROD_COUNT = "Cant.";


function sortProducts(criteria, array) {
  switch(criteria){
    case ORDER_ASC_BY_PRICE:
      return array.sort(function (a, b) {
        if (a.cost < b.cost) { return -1; }
        if (a.cost > b.cost) { return 1; }
        return 0;
      });
    break;
    case ORDER_DESC_BY_PRICE:
      return array.sort(function (a, b) {
        if (a.cost > b.cost) { return -1; }
        if (a.cost < b.cost) { return 1; }
        return 0;
      });
      break;
    case ORDER_BY_PROD_COUNT:
      result = array.sort(function (a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
  
        if (aCount > bCount) { return -1; }
        if (aCount < bCount) { return 1; }
        return 0;
      });
  }
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
  console.log(currentProductsArray)
  //Muestro los productos ordenados
  showProducts();
}

document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("sortAscPrice").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDescPrice").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("sortProdCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COUNT);
  });
})


//Se guarda la id de los productos
function selectProduct(Id) {
  saveProductIdSelected(Id);
  window.location.href = 'product-info.html'
}
