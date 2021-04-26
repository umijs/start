import express from "express";
const router = express.Router();

/* GET  */
router.post("/", function (req, res, next) {
  res.send({
    data: {
      text: "Alita",
    },
    message: "success",
  });
});

export default router;
