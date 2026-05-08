require('dotenv').config();
const initDb = require('./initDb');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await initDb();
    console.log('Connected to MySQL for admin seeding...');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('Error: ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
      process.exit(1);
    }

    const existing = await User.findByEmail(adminEmail);
    if (existing) {
      console.log('Admin user already exists. Updating password...');
      await User.updatePassword(existing.id, adminPassword);
      console.log('Admin password updated successfully.');
    } else {
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created successfully.');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
