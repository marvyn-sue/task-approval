// scripts/seed-user.js
import "dotenv/config";
import ConnectDB from "../lib/config/db";
import UserModel from "../lib/models/UserModel";

async function seedUser() {
  await ConnectDB();

  const email = "admin@example.com";
  const password = "securepassword123";

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    await UserModel.create({ email, password });
    console.log("✅ User created during build");
  } else {
    console.log("ℹ️ User already exists, skipping creation");
  }

  process.exit(0);
}

seedUser().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
