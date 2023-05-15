import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js"
import passport from "passport";

const router = Router()
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" }), async (req, res) => {
  return res.send({ status: "Success", message: "User registered" })

})
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "User already exists" })
})
router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/failLogin"}),async (req, res) => {
  if (!req.user)
  return res.status(401).send({ status: "error", error: "Unauthorized" });

  if(req.user.email === "adminCoder@coder.com"){
    req.user.role = "admin"
  }else{
    req.user.role = "user"
  }

  req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    age:req.user.age,
    email:req.user.email,
    role:req.user.role,
    password:"",
    cart:req.user.cart,
  }
  console.log(req.session.user)
  return res.send({status:"success",payload:req.user})

});
router.get("/failLogin",(req,res)=>{
  res.send({status:"error",error:"Authentication error"})
})
router.get("/current",(req,res)=>{
 return res.send({payload:req.session.user})
})
router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{

})

router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/"}),(req,res)=>{
  req.session.user=req.user
  res.redirect("/products")
})
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
});
export default router;