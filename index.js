import express from "express";
import cors from "cors";
import { addRestaurant, getAllRestaurants } from "./src/restaurants.js";
const app = express();
app.use(cors());
app.use(express.json());

//Routes go here -- defining which routes are allowed
app.post("/restaurants", addRestaurant);
app.get("/restaurants", getAllRestaurants);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000...`);
});
