const mongoose = require('mongoose');
var express = require('express');
const { Double } = require('bson');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

mongoose.connect("mongodb://localhost:27017/expeg")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    rno: { type: Number, required: true, unique: true,},
    name: String,
    age: Number,
    gpa: Double
});

const User = mongoose.model("MyStudent", userSchema);

//CREATING A STUDENT DOCUMENT using Post
app.post('/save',async function(req, res){
    try {
        console.log("Request received through POST", req.body.name);
        const { rno, name, age, gpa } = req.body;
        const user = new User({ rno, name, age, gpa});
        await user.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });


//FETCHING A SINGLE DOCUMENT WITH RNO using Get
app.get("/show", async (req, res) => {
    try {
            const rno = parseInt(req.query.rno); // Convert rno to number
            if (isNaN(rno)) {
                return res.status(400).json({ message: "Invalid Roll Number" });
            }
    
            const student = await User.findOne({rno:rno});
    
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (err) {
            res.status(500).json({ message: "Server Error", error: err.message });
        }
      });


//FETCHING ALL DOCUMENTS using Get
app.get("/showall", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **UPDATING SINGLE DOCUMENT USING post **
app.post("/update", async (req, res) => {
    try {
      const { rno, name, age, gpa } = req.body;
      const user = await User.findOneAndUpdate({rno}, { name, age, gpa }, { new: true });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// **DELETING SINGLE DOCUMENT USING post **
app.post("/delete", async (req, res) => {
    try {
      const user = await User.findOneAndDelete({rno: req.body.rno});
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
app.listen(8080, ()=>{console.log("Server is listening")})