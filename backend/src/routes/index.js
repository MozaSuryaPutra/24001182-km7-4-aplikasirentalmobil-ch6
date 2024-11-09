const express = require("express");
const carsRouter = require("./cars");
const carTypeRouter = require("./carType");
const carsModelRouter = require("./carsModel");
const authRouter = require("./auth.js");
const router = express.Router();

router.use("/cars", carsRouter);
router.use("/type", carTypeRouter);
router.use("/models", carsModelRouter);
router.use("/auth", authRouter);
module.exports = router;
