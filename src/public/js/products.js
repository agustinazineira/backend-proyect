const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');
let cId=document.getElementById("cid").value

addToCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // const cartId = form.querySelector("#cid").value;
    // alert(cartId+"fsfsdf")
    const productId = form.getAttribute("id").split("-")[1];

    const prodTitle = form.closest("div").querySelector("h5").textContent;
    
    fetch(`/api/carts/${cId}/product/${productId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart!",
          text: `You added 1 unit of ${prodTitle}`,
          toast: true,
          position: "top-right",
          icon: "success",
        
        });
      })
      .catch((error) => console.log(error));
  });
});
logout.addEventListener("click",(e)=>{
  fetch(`/api/sessions/logout`, {
    method: "GET",
  }) .then(() => {
    Swal.fire({
      title: "Logout successful!",
      text: `Redirecting you to the login`,
      allowOutsideClick: false,

      icon: "success",
      timer: 3000,
      //timerProgressBar: true,
      willClose: () => {
        window.location.href = "/";
      }
      
    });
  })
  .catch((error) => console.log(error));

})