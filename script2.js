let cartIcon = document.querySelector("#cart_icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close_cart");

$(document).ready(function(){
  $("#cartbut").click(function(){
    $(".cart").addClass("active");
  })
})
$(document).ready(function(){
  $("#close_cart").click(function(){
    $(".cart").removeClass("active");
  })
})
if(document.readyState=="loading"){
  document.addEventListener("DOMContentLoaded", ready);
}
else{
  ready();
}
function ready(){
  var addCart = document.getElementsByClassName("atcb");
  for(var i=0; i<addCart.length; i++)
  {
    var atc=addCart[i];
    atc.addEventListener("click",addCartClicked);
  }
  document.getElementsByClassName("buybtn")[0].addEventListener("click", function() {
    document.getElementsByClassName("paymentwindow")[0].style.display="block";
    document.getElementsByClassName("amounttag")[0].innerHTML=`<b>Amount Payable</b>(Inc of all taxes): <b>Rs${total}</b>`
    document.getElementsByClassName("opac")[0].style.opacity="0.5";
    var cartContent = document.getElementsByClassName("cart_content")[0];
    while(cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild);
    }
  });
  document.getElementsByClassName("placebtn")[0].addEventListener("click", function() {
    document.getElementsByClassName("paymentwindow")[0].style.display="none";
    alert("order placed!")
    }
  );
}
function removeCartItem(event){
  console.log(event.target.parentElement);
  event.target.parentElement.remove();
  updateTotal();
}
function quantityChanged(event){
  var input=event.target;
  if(isNaN(input.value) || input.value<=0){
    input.value=1;
  }
  else {
    updateTotal();
  }
}
function addCartClicked(event) {
  // console.log(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.src)
  var title = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[0].innerText;
  var price = event.target.parentElement.previousElementSibling.innerText;
  var productImg = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.src;
  addProducttoCart(title, price, productImg);
}
function addProducttoCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart_box");
  var cartBoxContent = `<img src="${productImg}" class="cart_img" alt="">
  <div class="detail_box">
    <div class="cart_product_title">${title}</div>
    <span class="cart_p"><p>Rs </p><div class="cart_price">${price}</div></span>
  </div>
  <input type="number" value="1" min="1" class="cart_quantity">
  <i class="fa-solid fa-trash cart_remove"></i>`;
  var CartItemName = document.getElementsByClassName("cart_product_title");
  for(var i=0;i<CartItemName.length;i++){
    if(CartItemName[i].innerText==title){
      alert("Item Already Added, Increase the quantity in cart");
      return
    }
  }
  cartShopBox.innerHTML= cartBoxContent;
  const cart = document.getElementsByClassName('cart')[0];
  const total = document.querySelector('.total');
  cart.insertBefore(cartShopBox, total);
  var quantityinputs = document.getElementsByClassName("cart_quantity");
  for(var i=0; i<quantityinputs.length; i++)
  {
    var inputq=quantityinputs[i];
    inputq.addEventListener("click",quantityChanged);
  }
  var removeCartButtons = document.getElementsByClassName("cart_remove");
  for(var i=0; i<removeCartButtons.length; i++)
  {
    var button=removeCartButtons[i];
    button.addEventListener("click",removeCartItem);
  }
  document.getElementsByClassName("cart_box")[0].classList.add("bordertop");
  var borderbelow = document.getElementsByClassName("cart_box").length - 1;
  document.getElementsByClassName("cart_box")[borderbelow].classList.add("borderniche");
  updateTotal();
}

function updateTotal(){
  var cartBoxes= document.getElementsByClassName("cart_box");
  var total=0;
  for(var i=0; i<cartBoxes.length; i++) {
    var cartBox=cartBoxes[i];
    var priceElement = cartBox.children[1].children[1].children[1];
    var quantityElement = cartBox.children[2];
    var price= parseFloat(priceElement.innerText);
    var quantity = quantityElement.value;
    total=total+price*quantity;
  }
  document.getElementsByClassName("total_price")[0].innerText="₹" + total;
  document.getElementsByClassName("amounttag")[0].innerHTML=`<b>Amount Payable</b>(Inc of all taxes): <b>Rs${total}</b>`
    
  console.log(total);
}