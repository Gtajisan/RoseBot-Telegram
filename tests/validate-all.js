#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n🔍 COMPREHENSIVE BOT VALIDATION\n');

// 1. Check all command files
console.log('📋 COMMAND VALIDATION:');
const cmdDir = './scripts/commands';
const commands = fs.readdirSync(cmdDir).filter(f => f.endsWith('.js'));

let validCount = 0;
let errorCount = 0;

commands.forEach(file => {
  try {
    const cmd = require(path.join(__dirname, '..', cmdDir, file));
    if (cmd.name && typeof cmd.execute === 'function') {
      validCount++;
      console.log(`  ✅ ${cmd.name.padEnd(20)} - Valid`);
    } else {
      errorCount++;
      console.log(`  ❌ ${file.padEnd(20)} - Missing name or execute`);
    }
  } catch (error) {
    errorCount++;
    console.log(`  ❌ ${file.padEnd(20)} - ${error.message}`);
  }
});

console.log(`\n📊 Commands: ${validCount} valid, ${errorCount} errors\n`);

// 2. Check dependencies
console.log('📦 DEPENDENCY CHECK:');
const pkg = require(path.join(__dirname, '..', 'package.json'));
const requiredDeps = ['telegraf', 'express', 'better-sqlite3', 'axios'];
const missing = [];

requiredDeps.forEach(dep => {
  if (pkg.dependencies[dep]) {
    console.log(`  ✅ ${dep.padEnd(20)} - Installed`);
  } else {
    console.log(`  ❌ ${dep.padEnd(20)} - MISSING`);
    missing.push(dep);
  }
});

if (missing.length > 0) {
  console.log(`\n⚠️  Missing dependencies: ${missing.join(', ')}`);
}

// 3. Check core files
console.log('\n📁 CORE FILES CHECK:');
const coreFiles = ['index.js', 'Goat.js', 'config.json', 'package.json'];
coreFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
  }
});

// 4. Check directories
console.log('\n📂 DIRECTORIES CHECK:');
const dirs = ['bot/handlers', 'scripts/commands', 'scripts/events', 'database', 'logger'];
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} - MISSING`);
  }
});

// 5. Syntax check
console.log('\n✔️  SYNTAX VALIDATION:');
let syntaxErrors = 0;
commands.forEach(file => {
  try {
    require('child_process').execSync(`node -c ${cmdDir}/${file}`, { stdio: 'pipe' });
  } catch (error) {
    syntaxErrors++;
    console.log(`  ❌ ${file} - Syntax error`);
  }
});
if (syntaxErrors === 0) {
  console.log('  ✅ All command files have valid syntax');
}

// Summary
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ VALIDATION COMPLETE');
console.log(`   Total Commands: ${validCount}/${commands.length}`);
console.log(`   Syntax Errors: ${syntaxErrors}`);
console.log(`   Missing Dependencies: ${missing.length}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (errorCount === 0 && syntaxErrors === 0 && missing.length === 0) {
  console.log('🚀 BOT IS PRODUCTION-READY!\n');
  process.exit(0);
} else {
  console.log('⚠️  Fix errors before deploying\n');
  process.exit(1);
}
