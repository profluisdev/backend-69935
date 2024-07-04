import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/setCookie", (req, res) => {
  res.cookie("userData", "Welcome Juan", { maxAge: 100000 }).send("Cookie setted");
});

router.get("/setSignedCookie", (req, res) => {
  res.cookie("userData", "Cookie Signed", { maxAge: 100000, signed: true }).send("Cookie setted");
});

router.get("/getCookie", (req, res) => {
  res.send(req.cookies.userData);
});

router.get("/getSignedCookie", (req, res) => {
  res.send(req.signedCookies.userData);
});

router.get("/deleteCookie", (req, res) => {
  res.clearCookie("userData").send("Cooke deleted");
});

router.post("/setData", (req, res) => {
  const { user, email } = req.body;

  res.cookie("user", { user, email }, { maxAge: 100000, signed: true }).send("User set cookie");
});

router.get("/getData", (req, res) => {
  res.send(req.signedCookies.user);  
})

export default router;
