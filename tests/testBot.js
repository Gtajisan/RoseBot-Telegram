/**
 * Bot Command Tests for Rose Bot
 */

const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

async function testCommands() {
  console.log('\n🤖 Rose Bot Command Tests\n');

  const commandDir = path.join(__dirname, '../scripts/commands');
  const files = fs.readdirSync(commandDir).filter(f => f.endsWith('.js'));

  let loaded = 0;
  let failed = 0;
  const failedCommands = [];

  for (const file of files) {
    try {
      const cmd = require(path.join(commandDir, file));
      if (cmd && cmd.name && cmd.execute) {
        loaded++;
        logger.bot(`COMMAND_LOAD: /${cmd.name} ✅`);
      } else {
        failed++;
        failedCommands.push(file);
        logger.error('BOT', new Error(`Invalid command structure: ${file}`), {});
      }
    } catch (error) {
      failed++;
      failedCommands.push(file);
      logger.error('BOT', error, { file });
    }
  }

  console.log(`📋 Commands loaded: ${loaded}/${files.length}`);
  if (failed > 0) {
    console.log(`❌ Failed commands: ${failedCommands.join(', ')}`);
  } else {
    console.log('✅ All commands loaded successfully!');
  }

  logger.info('BOT', 'Command test completed', { loaded, failed, total: files.length });

  return { loaded, failed, total: files.length };
}

async function testEventHandlers() {
  console.log('\n📡 Event Handler Tests\n');

  try {
    const EventHandler = require('../bot/handlers/EventHandler');
    if (EventHandler) {
      console.log('✅ EventHandler loaded');
      logger.bot('HANDLER_LOAD: EventHandler ✅');
      return true;
    }
  } catch (error) {
    console.error('❌ EventHandler failed:', error.message);
    logger.error('BOT', error, { handler: 'EventHandler' });
    return false;
  }
}

async function testCommandHandler() {
  console.log('\n📋 CommandHandler Tests\n');

  try {
    const CommandHandler = require('../bot/handlers/CommandHandler');
    if (CommandHandler) {
      console.log('✅ CommandHandler loaded');
      logger.bot('HANDLER_LOAD: CommandHandler ✅');
      
      const cmd = CommandHandler.get('help');
      if (cmd) {
        console.log('✅ Help command found');
        return true;
      } else {
        console.log('⚠️  Help command not found');
        return true;
      }
    }
  } catch (error) {
    console.error('❌ CommandHandler failed:', error.message);
    logger.error('BOT', error, { handler: 'CommandHandler' });
    return false;
  }
}

async function runAllTests() {
  console.log('\n════════════════════════════════════════');
  console.log('  Rose Bot - Complete Test Suite');
  console.log('════════════════════════════════════════\n');

  try {
    const cmdTest = await testCommands();
    const eventTest = await testEventHandlers();
    const handlerTest = await testCommandHandler();

    console.log('\n════════════════════════════════════════');
    console.log('  Test Summary');
    console.log('════════════════════════════════════════\n');

    console.log(`📊 Commands: ${cmdTest.loaded}/${cmdTest.total} loaded`);
    console.log(`📡 EventHandler: ${eventTest ? '✅' : '❌'}`);
    console.log(`📋 CommandHandler: ${handlerTest ? '✅' : '❌'}`);

    const allPassed = cmdTest.failed === 0 && eventTest && handlerTest;
    if (allPassed) {
      console.log('\n✅ All tests passed!');
      logger.info('TESTS', 'All bot tests passed', {});
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed');
      logger.error('TESTS', new Error('Some tests failed'), {});
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal test error:', error.message);
    logger.error('TESTS', error, {});
    process.exit(1);
  }
}

runAllTests();
