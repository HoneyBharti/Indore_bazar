import express from "express"
import { connectdb } from "./config/dbconfig.js"
import authroutes from "./routes/authroutes.js"
import errorhandler from "./middleware/errorhandler.js"
import adminroute from "./routes/adminroute.js"
import shopownerroutes from "./routes/shopownerroutes.js"
import productroute from "./routes/productroute.js"
import cartroutes from "./routes/cartroutes.js"
import orderroutes from "./routes/orderroutes.js"
import shoproutes from "./routes/shoproutes.js"
import couponroutes from "./routes/couponroutes.js"
import chatbotroutes from "./routes/chatbotroutes.js"

const app = express()

connectdb()

const rawOrigins = process.env.CORS_ORIGIN
const allowedOrigins = rawOrigins
  ? rawOrigins.split(",").map((o) => o.trim()).filter(Boolean)
  : ["*"]

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins[0] === "*") {
    res.setHeader("Access-Control-Allow-Origin", "*")
  } else if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Vary", "Origin")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.status(200)
  res.json({
    message: " WELCOME TO INDORE BAZAR API 1.00",
  })
})

app.use("/api/auth", authroutes)
app.use("/api/admin", adminroute)
app.use("/api/shop-owner", shopownerroutes)
app.use("/api/products", productroute)
app.use("/api/cart", cartroutes)
app.use("/api/order", orderroutes)
app.use("/api/shops", shoproutes)
app.use("/api/coupons", couponroutes)
app.use("/api/chat", chatbotroutes)

app.use(errorhandler)

export default app
