const logout= document.getElementById("logout")
const formButton= document.getElementById('botonForm');
let cId=document.getElementById("cid").value
let pId=document.getElementById('pid').value;
// addToCart.forEach((form) => {
const home=document.getElementById("home");
  formButton.addEventListener("click", (e) => {
    e.preventDefault();
    // alert(form.getAttribute("id"))
   

    // const productId = form.getAttribute("id").split("-")[1];
    

    const title=document.getElementById("title")
    // const prodTitle = form.closest("div").querySelector("h5").textContent;

    fetch(`/api/carts/${cId}/product/${pId}`, {
      method: "POST",
    })
      .then(() => {
        Swal.fire({
          title: "Product added to cart!",
          text: `You added 1 unit of the product ${title.innerHTML}`,
          toast: true,
          position: "top-right",
          icon: "success",
          customClass: {
            popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
            confirmButton: "!bg-blue-600 !px-5",
            timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
          },
        });
      })
      .catch((error) => console.log(error));
  });
 
  
  home.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "/products";
  })
  logout.addEventListener("click",(e)=>{
    fetch(`/api/sessions/logout`, {
      method: "GET",
    }) .then(() => {
      Swal.fire({
        title: "Logout successful!",
        text: `Redirecting you to the login`,
        allowOutsideClick: false,
        confirmButton: false,
        icon: "success",
        timer: 3000,
        //timerProgressBar: true,
        customClass: {
          popup: "!text-slate-200 !bg-slate-800/90 !rounded-3xl",
          confirmButton: "!bg-blue-600 !px-5",
          timerProgressBar: "!m-auto !h-1 !my-2 !bg-blue-600/90 !rounded-3xl",
        },
        willClose: () => {
          window.location.href = "/";
        }
        
      });
    })
    .catch((error) => console.log(error));
  
  })
  
// });