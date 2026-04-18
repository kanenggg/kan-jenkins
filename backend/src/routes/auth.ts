import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

// ส่ง User ไปหน้า Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// จุดรับข้อมูลกลับจาก Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      const user = req.user as any;
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!
      );
      res.redirect(`http://35.202.168.233:3000`);
    } catch (err) {
      console.error("CALLBACK ROUTE ERROR:", err);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
