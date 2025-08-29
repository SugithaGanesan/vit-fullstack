const express = require("express");
const app = express();
app.use(express.json());

// ---- YOUR DETAILS ----
const FULL_NAME = "sugitha_g";   // example: "sugitha_k"
const DOB = "05042005";              // ddmmyyyy format
const EMAIL = "sugitha.g2022@vitstudent.ac.in";  // your email
const ROLL_NUMBER = "22BIT0674";     // your roll number
// -----------------------

app.post("/bfhl", (req, res) => {
  try {
    let data = req.body.data || [];

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {

      if (/^-?\d+$/.test(item)) {
  let num = parseInt(item);
  if (num % 2 === 0) even_numbers.push(num.toString()); // ensure string
  else odd_numbers.push(num.toString());                  // ensure string
  sum += num;
}


      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // build concatenation string (reverse + alternating caps)
    let allAlphaChars = data
      .filter(item => /^[a-zA-Z]+$/.test(item))
      .join("")
      .split("")
      .reverse();

    let concat_string = allAlphaChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;
