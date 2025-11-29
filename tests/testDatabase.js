/**
 * Database Tests for Rose Bot
 */

const DB = require('../database/index.js');
const logger = require('../utils/logger');

async function runTests() {
  const db = new DB('./database/test.db');
  let passed = 0;
  let failed = 0;

  console.log('\n📋 Rose Bot Database Tests\n');

  try {
    // Test 1: Add User
    console.log('Test 1: Add User...');
    await db.addUser(123456, { username: 'testuser', first_name: 'Test', last_name: 'User' });
    const user = await db.getUser(123456);
    if (user && user.username === 'testuser') {
      console.log('✅ Add User: PASSED');
      passed++;
    } else {
      console.log('❌ Add User: FAILED');
      failed++;
    }

    // Test 2: Add Chat
    console.log('Test 2: Add Chat...');
    await db.addChat(-1001234567890, { title: 'Test Group', type: 'supergroup' });
    const chat = await db.getChat(-1001234567890);
    if (chat && chat.title === 'Test Group') {
      console.log('✅ Add Chat: PASSED');
      passed++;
    } else {
      console.log('❌ Add Chat: FAILED');
      failed++;
    }

    // Test 3: Add Warning
    console.log('Test 3: Add Warning...');
    await db.addWarning(123456, -1001234567890, 'Spam');
    const warnings = await db.getWarnings(123456, -1001234567890);
    if (warnings === 1) {
      console.log('✅ Add Warning: PASSED');
      passed++;
    } else {
      console.log('❌ Add Warning: FAILED');
      failed++;
    }

    // Test 4: Add Note
    console.log('Test 4: Add Note...');
    await db.addNote(123456, 'test_note', 'This is a test note');
    const notes = await db.getNotes(123456);
    if (notes && notes.length > 0 && notes[0].name === 'test_note') {
      console.log('✅ Add Note: PASSED');
      passed++;
    } else {
      console.log('❌ Add Note: FAILED');
      failed++;
    }

    // Test 5: Add Filter
    console.log('Test 5: Add Filter...');
    await db.addFilter(-1001234567890, 'badword', 'This word is not allowed');
    const filters = await db.getFilters(-1001234567890);
    if (filters && filters.length > 0 && filters[0].trigger === 'badword') {
      console.log('✅ Add Filter: PASSED');
      passed++;
    } else {
      console.log('❌ Add Filter: FAILED');
      failed++;
    }

    // Test 6: Add Lock
    console.log('Test 6: Add Lock...');
    await db.addLock(-1001234567890, 'photo');
    const locks = await db.getLocks(-1001234567890);
    if (locks && locks.length > 0 && locks[0].lock_type === 'photo') {
      console.log('✅ Add Lock: PASSED');
      passed++;
    } else {
      console.log('❌ Add Lock: FAILED');
      failed++;
    }

    // Test 7: Command Usage
    console.log('Test 7: Command Usage...');
    await db.addCommandUsage(123456, -1001234567890, 'help');
    const stats = await db.getStats();
    if (stats.commands > 0) {
      console.log('✅ Command Usage: PASSED');
      passed++;
    } else {
      console.log('❌ Command Usage: FAILED');
      failed++;
    }

    // Test 8: Get Stats
    console.log('Test 8: Get Stats...');
    if (stats.users > 0 && stats.chats > 0) {
      console.log('✅ Get Stats: PASSED', JSON.stringify(stats));
      passed++;
    } else {
      console.log('❌ Get Stats: FAILED');
      failed++;
    }

    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

    if (failed === 0) {
      console.log('✅ All database tests passed!');
      logger.info('TESTS', 'All database tests passed', { passed, failed });
    } else {
      console.log(`❌ ${failed} test(s) failed`);
      logger.error('TESTS', new Error(`${failed} test(s) failed`), { passed, failed });
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
    logger.error('TESTS', error, {});
  } finally {
    await db.close();
  }
}

// Run tests
runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
