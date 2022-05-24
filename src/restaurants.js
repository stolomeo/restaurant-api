import { connectDb } from "./connectDb.js";

export const addRestaurant = async (req, res) => {
  const { name, address, rating, cuisine } = req.body;
  if (!req.body || !name || !address) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();

  const newRestaurant = {
    name,
    address,
    rating: rating || 3,
    cuisine: cuisine || "American",
  };
  try {
    const doc = await db.collection("restaurants").add(newRestaurant);
    res.status(201).send(`Restaurant created ${doc.id}`);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const db = connectDb();
    const snapshot = await db.collection("restaurants").get();
    const restaurantsArr = snapshot.docs.map((doc) => {
      let restaurant = doc.data();
      restaurant.id = doc.id;
      return restaurant;
    });
    res.send(restaurantsArr);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const updateRestaurant = (req, res) => {
  if (!req.params || !req.params.restaurantId || !req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const { restaurantId } = req.params;
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .update(req.body)
    .then(() => {
      res.send("Restaurant updated.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
export const deleteRestaurant = (req, res) => {
  const { restaurantId } = req.params;
  if (!restaurantId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .delete()
    .then(() => {
      res.send("Restaurant deleted.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
