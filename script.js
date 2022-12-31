const datalist = document.getElementById("product-list");
const inputDataOfDatalist = document.getElementById("product")
const inputProductPics = document.getElementById("product-pics");
const confrimProduct = document.getElementById("confrim-product");
const containerListItems = document.querySelector(".container-items");
const resetBtn = document.getElementById("reset");


const errorContainer = document.querySelector(".errors-container")

let products = {
    dvr: ["DS-7104HQHI-K1", "DS-7104HGHI-F1", "DS-7108HQHI-K1", "DS-7108HGHI-K1"],
    nvr: ["DS-7232NI-K2", "DS7332NI-K4", "DS-7608NI-K2"],
    "ip camera": ["DS-1043"],
    "switch": ["0310HP-E", "0109P-E"]
};

let productList = [];


const addDatalist = (productsIsObj) => {
    let html = ""

    for(const [key, value] of Object.entries(productsIsObj)){
        value.forEach((name) => {
            html += `
            <optgroup label="${key}">
                <option value="${name}">${key.toUpperCase()
                }</option>
            </optgroup>  
            `
        })
    }
    datalist.innerHTML =  html;
};


const addProductToList = (confrim, item, pics, containerListElement) => {
    
    windowsOnloadData(containerListElement)

    item.addEventListener("keypress", (e) => {
        if(e.key=="Enter") confrim.click()
    });

    pics.addEventListener("keypress", (e) => {
        if(e.key=="Enter") confrim.click()
    });
  
    confrim.addEventListener("click", () => {
        let html = "";
        if(item.value.replace(/\s/g, '') != "" && pics.value.replace(/\s/g, '') != ""){
            productList.unshift({name: item.value, pics: pics.value});
            localStorage.setItem('productList', JSON.stringify(productList));
            productList.forEach(item => {
                html += `
                        <ul>
                            <li>${item.name}</li>
                            <li>${item.pics}</li>
                        </ul>
                `
            })
            item.value = "";
            pics.value = "";
            containerListElement.innerHTML = html;
        } else{
                html = `
                <div class="error">
                    Boş dəyər daxil edilə bilməz
                </ div>
                `
                errorContainer.innerHTML += html
                setTimeout(() => errorContainer.firstElementChild.remove(), 2000)
            }
    })
};

const windowsOnloadData = (containerList) => {
    window.addEventListener("load", () => {
        if(localStorage.getItem("productList")) productList = JSON.parse(localStorage.getItem("productList"));
        let html = "";
        productList.forEach(item => {
            html += `
                    <ul>
                        <li>${item.name}</li>
                        <li>${item.pics}</li>
                    </ul>
            `
        });
        containerList.innerHTML = html
    });    

};

const removeAll = () => {
    productList = [];
    localStorage.removeItem("productList");
}



addDatalist(products);

addProductToList(confrimProduct, inputDataOfDatalist, inputProductPics, containerListItems);



