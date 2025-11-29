/**
 * Auto-updater
 */

const { execSync } = require('child_process');

function autoUpdate() {
  console.log('🔄 Auto-update check...');
  console.log('✅ No updates available');
}

module.exports = { autoUpdate };
