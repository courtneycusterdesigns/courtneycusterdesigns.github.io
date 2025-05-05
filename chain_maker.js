// set product id to silver base chain
let colorNum = 10;
let charmNum = 0;
let productNum = colorNum + charmNum;

localStorage.setItem('product_id', productNum);

const selectColorCard = (cardNo) => {
    // Loop through all color radio cards, and remove the class "selected" from those elements.
    const allColorCards = document.querySelectorAll(".color-card");
    allColorCards.forEach((element, index) => {
        element.classList.remove(["selected"]);
    });
    
    // Add the class "selected" to the card which user has clicked on.
    const selectedCard = document.querySelector(".color-card-" + cardNo);
    selectedCard.classList.add(["selected"]);

    if(cardNo == 1){
        colorNum = 10;
    } else if(cardNo == 2){
        colorNum = 20;
    } else if(cardNo == 3){
        colorNum = 30;
    }
    productNum = colorNum + charmNum;
    localStorage.setItem('product_id', productNum);
    showProduct(productNum);
};

const selectCharmCard = (cardNo) => {
    // Loop through all charm radio cards, and remove the class "selected" from those elements.
    const allCharmCards = document.querySelectorAll(".charm-card");
    allCharmCards.forEach((element, index) => {
        element.classList.remove(["selected"]);
    });

    // Add the class "selected" to the card which user has clicked on.
    const selectedCard = document.querySelector(".charm-card-" + cardNo);
    selectedCard.classList.add(["selected"]);

    if(cardNo == 4){
        charmNum = 1;
    } else if(cardNo == 5){
        charmNum = 2;
    } else if(cardNo == 6){
        charmNum = 3;
    } else if(cardNo == 7){
        charmNum = 4;
    } else if(cardNo == 8){
        charmNum = 5;
    } else if(cardNo == 9){
        charmNum = 6;
    } else if(cardNo == 0){
        charmNum = 0;
    }
    productNum = colorNum + charmNum;
    localStorage.setItem('product_id', productNum);
    showProduct(productNum);
};

function modify_value() {
    var hidden_field = document.getElementsByName('color');
    hidden_field.value = 'testvalue';
}