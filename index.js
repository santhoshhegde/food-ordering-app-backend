const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;
app.use(cors());

app.get("/api", async (req, res) => {
  const { lat, lng } = req.query;
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to fetch data");
  }
});

app.get("/api/menu", async (req, res) => {
  try {
    const { resId, lat, lng } = req.query;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    };
    const response = await axios.get(url, header);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

app.use("/", (req, res) => {
  res.send("Welcome to Food Ordering App");
});
app.listen(port, () => console.log(`Proxy server running on port ${port}`));
