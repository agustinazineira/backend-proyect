function checkLogin(req, res, next) {
    if (!req.session.user) return res.redirect("/");
    next();
  }
  
  function checkLogged(req, res, next) {
    if (req.session.user) return res.redirect("/products");
    next();
  }
  
  export { checkLogged, checkLogin };