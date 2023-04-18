const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');

addToCartForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cartId = form.querySelector("#cid").value;
    const productId = form.getAttribute("id").split("-")[1];

    const prodTitle = form.closest("div").querySelector("h5").textContent;

    fetch(`/api/carts/${cartId}/product/${productId}`, {
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