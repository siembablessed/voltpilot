const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load users from Excel
function loadUsers() {
  const filePath = path.join(__dirname, "users.xlsx");
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (data.length > 0) {
      console.log(`✅ Excel loaded successfully: ${data.length} users found.`);
    } else {
      console.warn("⚠️ Excel loaded but no users found.");
    }

    return data;
  } catch (error) {
    console.error("❌ Failed to read Excel file:", error.message);
    return [];
  }
}

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();

  console.log("📥 Login attempt:", email);

  const user = users.find(
    (u) =>
      u.Email?.trim().toLowerCase() === email.trim().toLowerCase() &&
      u.Password?.trim() === password.trim()
  );

  if (!user) {
    console.log("❌ Invalid credentials for:", email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("✅ User authenticated:", user.FullName);

  res.json({
    fullName: user.FullName,
    email: user.Email,
    role: user.Role
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
