const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const dotenv = require("dotenv")
const app = express();
const port = 3000;

dotenv.config()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const ai = new GoogleGenAI({ apiKey: "AIzaSyAb1V5elNmxWKiJ0WEsJD-gPxgqNwUZF4w" });

app.post("/api/gemini/prompt/send", async (req,res)=>{
  const {prompt} = req.body;

  if(!prompt){
    return res.status(400).json({"message": "Please send a valid prompt"})
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:prompt,
  });
  return res.status(200).json(response);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = {app}
