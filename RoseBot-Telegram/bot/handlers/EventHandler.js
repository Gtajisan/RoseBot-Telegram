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
    if (!fs.existsSync(eventsDir)) {
      this.logger.warn(`Events directory not found: ${eventsDir}`);
      return;
    }

    const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.js'));

    for (const file of files) {
      try {
        const filePath = path.join(eventsDir, file);
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
      await evt.execute(...args, this.db, this.config);
    } catch (error) {
      this.logger.error(`Event error (${eventName}):`, error.message);
    }
  }
}

module.exports = EventHandler;
