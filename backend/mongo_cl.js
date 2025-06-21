const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});
mongoose.connect('mongodb://localhost:27017/contactdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: String,
  isDeleted: { type: Boolean, default: false }
});
const Contact = mongoose.model('Contact', contactSchema);
app.get('/search/:type/:query', async (req, res) => {
  const { type, query } = req.params;
  if (!query) return res.status(400).json({ message: 'No search parameter provided' });
  try {
    let contact = null;
    const filter = { [type]: query, isDeleted: false };
    if (['phone', 'name', 'email'].includes(type)) {
      contact = await Contact.findOne(filter);
    }
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});
app.post('/save', async (req, res) => {
  try {
    const { phone, name, email } = req.body;
    if (!phone || !name) return res.status(400).json({ error: 'Phone and Name are required' });
    const contact = new Contact({ phone, name, email });
    await contact.save();
    res.status(201).json({ message: 'Contact saved successfully', contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/show", async (req, res) => {
  const { phone, name, email } = req.query;
  try {
    let query = { isDeleted: false };
    if (phone) query.phone = phone;
    else if (name) query.name = { $regex: `^${name}$`, $options: "i" };
    else if (email) query.email = { $regex: `^${email}$`, $options: "i" };
    else return res.status(400).json({ message: "No search parameter provided" });
    const contact = await Contact.findOne(query);
    if (!contact) return res.json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    console.error("Error fetching contact:", err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get('/showall', async (req, res) => {
  try {
    const contacts = await Contact.find({ isDeleted: false });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/update', async (req, res) => {
  try {
    const { phone, name, email } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { phone },
      { name, email },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/delete', async (req, res) => {
  const { phone } = req.body;
  console.log('Deleting contact with phone:', phone); 
  try {
    const result = await Contact.findOneAndUpdate(
      { phone },
      { isDeleted: true },
      { new: true }
    );
    if (!result) {
      console.log('No contact found with the given phone number');
      return res.status(404).send('Contact not found');
    }
    res.send('Contact soft-deleted successfully');
  } catch (error) {
    console.error('Error soft-deleting contact:', error);
    res.status(500).send('Error soft-deleting contact');
  }
});
app.post("/search", async (req, res) => {
  const { searchField, searchValue } = req.body;
  const query = { [searchField]: searchValue, isDeleted: false };
  try {
    const contact = await Contact.findOne(query);
    if (!contact) return res.status(404).json(null);
    res.json(contact);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
app.get('/deleted', async (req, res) => {
  try {
    const deletedContacts = await Contact.find({ isDeleted: true });
    res.json(deletedContacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/restore', async (req, res) => {
  try {
    const { phone } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { phone, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found or not deleted' });
    res.status(200).json({ message: 'Contact restored successfully', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});