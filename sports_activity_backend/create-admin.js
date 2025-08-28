const db = require('./config/db');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  const adminData = {
    username: 'admin',
    email: 'admin@sports.com',
    password: 'admin123',
    role: 'admin'
  };

  try {
    // Check if admin already exists
    db.query('SELECT * FROM users WHERE username = ?', [adminData.username], async (err, results) => {
      if (err) {
        console.error('Error checking admin user:', err);
        return;
      }

      if (results.length > 0) {
        console.log('Admin user already exists!');
        process.exit(0);
      }

      // Hash password and create admin user
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const user = { 
        username: adminData.username, 
        email: adminData.email, 
        password: hashedPassword, 
        role: adminData.role 
      };

      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          console.error('Error creating admin user:', err);
          return;
        }
        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('Role: admin');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Connect to database and create admin
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
  createAdminUser();
}); 