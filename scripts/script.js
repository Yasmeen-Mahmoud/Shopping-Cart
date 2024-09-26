let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || []; 

const generateShop = () => {
    return (shop.innerHTML = shopItemData.map((x) => {
        let {id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) ||[];
        return `<div class="item">
                <div class="image">
                    <img src=${img} alt="item12">
                </div>
                <div id=product-id-${id} class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join(""));
};

generateShop();


const increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) 
    {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else
    {
        search.item += 1;
    }

    //console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else
    {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    //console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

const calculation = () => {
    let cartIcon = document.getElementById("cartCounter");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
};

calculation();