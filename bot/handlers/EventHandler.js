const fs = require('fs');
const path = require('path');

class EventHandler {
  constructor(config, logger, db) {
    this.events = new Map();
    this.config = config;
    this.logger = logger;
    this.db = db;
  }

  load(eventsDir) {
    // Resolve to absolute path
    const absoluteDir = path.isAbsolute(eventsDir) 
      ? eventsDir 
      : path.resolve(__dirname, '../../', eventsDir);
    
    if (!fs.existsSync(absoluteDir)) {
      this.logger.warn(`Events directory not found: ${absoluteDir}`);
      return;
    }

    const files = fs.readdirSync(absoluteDir).filter(f => f.endsWith('.js'));

    for (const file of files) {
      try {
        const filePath = path.join(absoluteDir, file);
        delete require.cache[require.resolve(filePath)];
        const evt = require(filePath);

        if (evt.event && typeof evt.execute === 'function') {
          this.events.set(evt.event, evt);
          this.logger.info(`✅ Event loaded: ${evt.event}`);
        }
      } catch (error) {
        this.logger.error(`Failed to load event ${file}:`, error.message);
      }
    }

    this.logger.info(`📡 Total events: ${this.events.size}`);
  }

  async emit(eventName, ...args) {
    const evt = this.events.get(eventName);
    if (!evt) return;

    try {
      // Pass logger as well so events can log
      await evt.execute(...args, this.db, this.config, this.logger);
    } catch (error) {
      this.logger.error(`Event error (${eventName}):`, error.message);
    }
  }
}

module.exports = EventHandler;
