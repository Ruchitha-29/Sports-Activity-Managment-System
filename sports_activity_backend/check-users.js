const db = require('./config/db');

function checkUsers() {
  db.query('SELECT id, username, email, role FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return;
    }
    
    console.log('📋 Current Users in Database:');
    console.log('==============================');
    
    if (results.length === 0) {
      console.log('No users found in database.');
    } else {
      results.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log('   ---');
      });
    }
    
    console.log('\n💡 To test student login:');
    console.log('1. Register a new account (will be student by default)');
    console.log('2. Or use existing student credentials from above');
    console.log('3. Login and verify role-based access');
    
    process.exit(0);
  });
}

// Connect to database and check users
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL database');
  checkUsers();
}); 