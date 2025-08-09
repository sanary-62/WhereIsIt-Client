require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-service-key.json");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors({
  origin: ["https://whereisit-app-bdc3b.web.app"],
  credentials: true  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanary.5oi2id1.mongodb.net/?retryWrites=true&w=majority&appName=Sanary`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const itemsCollection = client.db("WhereIsIt").collection("items");
const recoveredItemsCollection = client
  .db("WhereIsIt")
  .collection("recoveredItems");

async function run() {
  try {
    // await client.connect();

    app.get("/items", async (req, res) => {
      const userEmail = req.query.email;

      let query = {};
      if (userEmail) {
        if (userEmail !== req.decoded.email) {
          return res.status(403).send({ message: "forbidden access" });
        }
        query = { userEmail: userEmail };
      }

      const result = await itemsCollection.find(query).toArray();
      res.send(result);
    });


    app.get("/myItems", verifyFirebaseToken, async (req, res) => {
  try {
    const userEmail = req.decoded.email;
    const query = { userEmail };
    const result = await itemsCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch user items" });
  }
});


    app.post("/jwt", (req, res) => {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await itemsCollection.findOne(query);
      res.send(result);
    });

    app.post("/items", verifyFirebaseToken, async (req, res) => {
      const newItem = req.body;

      if (newItem.userEmail !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const result = await itemsCollection.insertOne(newItem);
      res.status(201).send({ success: true, insertedId: result.insertedId });
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Missing or malformed token");
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("Decoded Firebase token:", decoded.email);
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(" Token verification failed:", error);
    return res.status(401).send({ message: "unauthorized access" });
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("WhereIsIt is Cooking");
});

app.post("/recoveredItems", async (req, res) => {
  try {
    const recoveredItem = req.body;
    const result = await recoveredItemsCollection.insertOne(recoveredItem);
    res.status(201).send({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Failed to save recovered item" });
  }
});

app.patch("/items/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid ID format" });
    }

    const updatedStatus = req.body.status;
    if (!updatedStatus) {
      return res
        .status(400)
        .send({ success: false, message: "Missing status in request body" });
    }

    const query = { _id: new ObjectId(id) };
    const update = { $set: { status: updatedStatus } };

    const result = await itemsCollection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Item not found" });
    }

    res.send({ success: true, message: "Item status updated" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Failed to update status" });
  }
});

app.get("/recoveredItems", async (req, res) => {
  try {
    const items = await recoveredItemsCollection.find().toArray();
    res.send(items);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Failed to fetch recovered items" });
  }
});

app.listen(port, () => {
  console.log(`WhereIsIt server is running on port ${port}`);
});

app.put("/items/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid ID format" });
    }

    const existingItem = await itemsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!existingItem) {
      return res
        .status(404)
        .send({ success: false, message: "Item not found" });
    }

    if (req.decoded.email !== existingItem.userEmail) {
      return res.status(403).send({ message: "forbidden access" });
    }

    const updateData = req.body;
    delete updateData._id;

    const result = await itemsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    res.send({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to update item" });
  }
});

app.delete("/items/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid ID format" });
    }

    const item = await itemsCollection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res
        .status(404)
        .send({ success: false, message: "Item not found" });
    }

    if (req.decoded.email !== item.userEmail) {
      return res.status(403).send({ message: "forbidden access" });
    }

    const result = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
    res.send({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to delete item" });
  }
});