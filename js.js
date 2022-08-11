const product_listId = [];
const exitBtn = document.querySelector(".exitIcon")
exitBtn.addEventListener("click", function () {
    document.querySelector(".cartJs").style.display = "none"
    document.querySelector("body").style.overflow = "scroll"
    document.querySelector(".fullScreen").style.display = "none"
})
const exitBtn1 = document.querySelector(".fullScreen")
exitBtn1.addEventListener("click", function () {
    document.querySelector(".cartJs").style.display = "none"
    document.querySelector("body").style.overflow = "scroll"
    document.querySelector(".fullScreen").style.display = "none"
})
const showBtn = document.querySelector(".header__main-cart")
showBtn.addEventListener("click", function () {
    document.querySelector(".cartJs").style.display = "block"
    document.querySelector("body").style.overflow = "hidden"
    document.querySelector(".fullScreen").style.display = "block"
})
var total_Item = 0;
var total_Price = 0;
function addItems(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    if (product_listId[index].number == 0) {
        product_listId[index].number+=1;
        document.getElementsByClassName('cartjs_item')[index].style.display = 'flex';
        document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
        document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML = product_listId[index].number;
    }
    else {
        product_listId[index].number+=1;
        document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
        document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML = product_listId[index].number;
    }
    
    total_Item+=1;
    total_Price += price;
    var total = new Intl.NumberFormat().format(total_Price)
    document.querySelector(".sumPrice1").innerHTML = total
    document.querySelector(".cartJs_header-sumItem").innerHTML = total_Item
    document.querySelector(".header__main-cart--count").innerHTML = total_Item
    if (total_Item == 0) {
        document.querySelector('.notCart').style.display = 'block';
    }
    else {
        document.querySelector('.notCart').style.display = 'none';
    }
}

function removeCart(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    total_Item -= product_listId[index].number;
    total_Price -= (product_listId[index].number * price);
    var total = new Intl.NumberFormat().format(total_Price)
    document.querySelector(".sumPrice1").innerHTML = total
    document.querySelector(".cartJs_header-sumItem").innerHTML = total_Item
    document.querySelector(".header__main-cart--count").innerHTML = total_Item
    product_listId[index].number = 0;
    document.getElementsByClassName('cartjs_item')[index].style.display = 'none';
    if (total_Item == 0) {
        document.querySelector('.notCart').style.display = 'block';
    }
    else {
        document.querySelector('.notCart').style.display = 'none';
    }
}

function addItem(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    product_listId[index].number+=1;
    total_Item+=1;
    total_Price += price;
    var total = new Intl.NumberFormat().format(total_Price)
    document.querySelector(".sumPrice1").innerHTML = total
    document.querySelector(".cartJs_header-sumItem").innerHTML = total_Item
    document.querySelector(".header__main-cart--count").innerHTML = total_Item
    document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
    document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML = product_listId[index].number;
}

function popItem(id, price) {
    let index = product_listId.findIndex((value) => {
        return value.id == id;
    })
    if(product_listId[index].number==1){
        document.getElementsByClassName('cartjs_item')[index].style.display = 'none';
        product_listId[index].number-=1;
    }else{
        product_listId[index].number-=1;
    }
    total_Item-=1;
    total_Price -= price;
    var total = new Intl.NumberFormat().format(total_Price)
    document.querySelector(".sumPrice1").innerHTML = total
    document.querySelector(".cartJs_header-sumItem").innerHTML = total_Item
    document.querySelector(".header__main-cart--count").innerHTML = total_Item
    document.getElementsByClassName('cartjs_item__countNumber')[index].innerHTML = product_listId[index].number;
    document.getElementsByClassName('cartjs_item__title-count--count')[index].innerHTML = product_listId[index].number;
    if (total_Item == 0) {
        document.querySelector('.notCart').style.display = 'block';
    }
    else {
        document.querySelector('.notCart').style.display = 'none';
    }
}



const url = "http://petsla-api.herokuapp.com/products/";
fetch(url) 
    .then(response => response.json())
    .then(data => {
        renderList(data);
    })
    .catch(Error => {
        console.log(Error);
    })

    const renderList = (data) => {
        let listBlock = document.querySelector('.container__parentItem');
        let htmlProduct = data.map(item => {
            item.image = "http://petsla-api.herokuapp.com" + item.images;
            product_listId.push({
                id: item.id, 
                number: 0, 
                htmlCart: `
            <div class="cartjs_item">
                <div class="cartjs_item__count">
                    <div class="add" onclick="addItem(${item.id}, ${item.price})">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <span class="cartjs_item__countNumber">1</span>
                    <div class="pop" onclick="popItem(${item.id}, ${item.price})">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                </div>
                <div class="cartjs_item__img">
                    <img class="js__img" style="width:100%" src="${item.image}" alt="">
                </div>
                <div class="cartjs_item__title">
                    <div class="cartjs_item__title-name">
                        ${item.product_name}
                    </div>
                    <div class="cartjs_item__title-price">
                        ${item.price.toLocaleString()}
                    </div>
                    <div class="cartjs_item__title-count">
                        <div class="cartjs_item__title-count--title">
                            Số lượng :
                        </div>
                        <div class="cartjs_item__title-count--count">
                            1
                        </div>
                    </div>
                </div>
                <div class="cartjs_item__clear" onclick="removeCart(${item.id}, ${item.price})">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
                `
            });
            return `
            <div class="container__item">
                     <div class="container__item-main">
                        <div class="container__item-main--img">
                             <img class="container__item-main--img_img" style="width:100%" src="${item.image}"">
                         </div>
                         <div class="container__item-main--contents">
                             <div class="container__item-main--contents-title">
                             ${item.product_name}
                             </div>
                             <div class="container__item-main--contents-price">
                             ${item.price.toLocaleString('vi-VN')}
                             </div>
                             <div class="container__item-main--click">
                                 <div class="container__item-main--click-title">
                                     <i class="fa-solid fa-bag-shopping"></i>
                                     <span style="margin-left: 0.5rem;">Buy now</span>
                                 </div>
                                 <div class="container__item-main--click-button" onclick="addItems(${item.id}, ${item.price})">
                                     <i class="fa-solid fa-cart-shopping"></i>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            `
        })
        listBlock.innerHTML = htmlProduct.join('');
        renderCart();
    }   
    
    const renderCart = () => {
        let blockCart = document.querySelector('.cartjs_itemParent');
        let htmlRenderCart = product_listId.map(item => {
            return item.htmlCart;
        })
        blockCart.innerHTML = htmlRenderCart.join('');
    }
    