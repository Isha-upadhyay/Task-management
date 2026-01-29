const db = require("../config/firebase");

// GET ALL USERS (ADMIN ONLY)
exports.getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      role: doc.data().role,
    }));

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
