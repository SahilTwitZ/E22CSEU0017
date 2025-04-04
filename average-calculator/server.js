const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const WINDOW_SIZE = 10;
let windowNumbers = [];

const fetchNumbersFromAPI = async (type) => {
  try {
    const response = await axios.get(`http://20.244.56.144/evaluation-service/${type}`, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error("API Error:", error.message);
    return [];
  }
};

app.get("/numbers/:type", async (req, res) => {
  const typeMap = { p: "primes", f: "fibo", e: "even", r: "rand" };
  const typeKey = typeMap[req.params.type];

  if (!typeKey) {
    return res.status(400).send({ error: "Invalid type" });
  }

  try {
    const numbersFromAPI = await fetchNumbersFromAPI(typeKey);

    numbersFromAPI.forEach((num) => {
      if (!windowNumbers.includes(num)) {
        windowNumbers.push(num);
      }
      if (windowNumbers.length > WINDOW_SIZE) {
        windowNumbers.shift();
      }
    });

    const avg = windowNumbers.length > 0 ? windowNumbers.reduce((acc, num) => acc + num, 0) / windowNumbers.length : 0;

    res.send({
      windowPrevState: [...windowNumbers.slice(0, Math.max(0, windowNumbers.length - numbersFromAPI.length))],
      windowCurrState: [...windowNumbers],
      numbers: numbersFromAPI,
      avg: parseFloat(avg.toFixed(2)),
    });
  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).send({ error: "Failed to process request" });
  }
});

app.listen(9876, () =>
  console.log("Average Calculator Microservice running on port 9876")
);
