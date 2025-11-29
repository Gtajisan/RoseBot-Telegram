const fs = require('fs');
const path = require('path');

// Get all command files
const commandDir = path.join(__dirname, '../commands');
const files = fs.readdirSync(commandDir).filter(f => f.endsWith('.js'));

console.log(`📂 Found ${files.length} command files to process`);

let fixed = 0;
let skipped = 0;

files.forEach(file => {
  const filePath = path.join(commandDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has error handling via commandHelper
  if (content.includes('commandHelper')) {
    skipped++;
    return;
  }

  // Add commandHelper import at top
  if (!content.includes("const commandHelper")) {
    content = "const commandHelper = require('../utils/commandHelper');\n" + content;
  }

  // Check if command has try-catch in execute
  if (!content.includes('try {') && content.includes('async execute')) {
    // Wrap entire execute body in try-catch
    content = content.replace(
      /async execute\(ctx, args, db, config, goat\) \{/,
      `async execute(ctx, args, db, config, goat) {
    try {`
    );
    
    content = content.replace(
      /    \}\s*\};\s*$/,
      `    } catch (error) {
      await commandHelper.handleError(ctx, goat, error, '/${path.basename(file, '.js')}');
    }
  }
};
`
    );
    
    fixed++;
  } else {
    skipped++;
  }

  fs.writeFileSync(filePath, content);
});

console.log(`✅ Fixed: ${fixed} commands`);
console.log(`⏭️  Skipped (already have error handling): ${skipped} commands`);
