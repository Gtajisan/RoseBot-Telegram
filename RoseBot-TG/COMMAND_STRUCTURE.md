# 🎯 Rose Bot Command Structure (GoatBot-V2 Style)

## Command Template Format

All Rose Bot commands follow the GoatBot-V2 style structure:

```java
package com.rosebot.commands.impl;

import com.rosebot.commands.ICommand;
import com.rosebot.core.RoseBot;
import org.telegram.telegrambots.meta.api.objects.Message;

/**
 * CMD: /commandname
 * Description: What the command does
 * Usage: /commandname [args]
 * Admin: true/false
 */
public class CommandNameCommand implements ICommand {

    @Override
    public void execute(Message message, RoseBot bot) {
        // Parse arguments
        String text = message.getText();
        String[] args = text.split(" ");
        
        // Check permissions
        if (!hasPermission(message)) {
            bot.sendError(message.getChatId(), "No permission");
            return;
        }

        // Execute command logic
        bot.sendSuccess(message.getChatId(), "Command result");
    }

    @Override
    public String getName() {
        return "commandname";
    }

    @Override
    public String getDescription() {
        return "Command description";
    }

    @Override
    public String getUsage() {
        return "/commandname [args]";
    }

    @Override
    public boolean hasPermission(Message message) {
        // TODO: Implement permission check
        return true;
    }
}
```

## Command Registration

Commands are registered in `CommandRouter.java`:

```java
commands.put("commandname", new CommandNameCommand());
```

## Command Header Format

All commands start with a JavaDoc header:

```java
/**
 * CMD: /commandname
 * Description: What the command does  
 * Usage: /commandname [args]
 * Admin: true/false
 */
```

## Message Formatting

Use these methods for consistent formatting:

```java
bot.sendMessage(chatId, "Simple message")
bot.sendSuccess(chatId, "Success message")
bot.sendError(chatId, "Error message")

// With formatting
MessageUtils.bold("text")
MessageUtils.italic("text")
MessageUtils.code("code")
```

## Available Commands

### Core Commands
| Command | File | Description |
|---------|------|-------------|
| /start | StartCommand.java | Welcome message |
| /help | HelpCommand.java | Show all commands |
| /ping | PingCommand.java | Check status |
| /info | InfoCommand.java | Bot info |
| /settings | SettingsCommand.java | Settings |

### Admin Commands
| Command | File | Description |
|---------|------|-------------|
| /admin | AdminCommand.java | Admin panel |
| /ban | BanCommand.java | Ban user |
| /kick | KickCommand.java | Kick user |
| /mod | ModCommand.java | Mod commands |
| /users | UsersCommand.java | User management |

### Fun Commands
| Command | File | Description |
|---------|------|-------------|
| /joke | JokeCommand.java | Random joke |
| /meme | MemCommand.java | Random meme |
| /fact | FactCommand.java | Random fact |
| /fun | FunCommand.java | Fun commands |
| /utils | UtilsCommand.java | Utilities |

### Stats Commands
| Command | File | Description |
|---------|------|-------------|
| /stats | StatsCommand.java | Bot statistics |
| /status | StatusCommand.java | Bot status |

## Adding a New Command

1. **Create file** in `src/main/java/com/rosebot/commands/impl/`
   - Filename: `CommandNameCommand.java`
   - Class: `CommandNameCommand implements ICommand`

2. **Implement interface**
   ```java
   @Override
   public void execute(Message message, RoseBot bot) { ... }
   @Override
   public String getName() { return "name"; }
   @Override
   public String getDescription() { return "desc"; }
   @Override
   public String getUsage() { return "/name"; }
   @Override
   public boolean hasPermission(Message message) { return true; }
   ```

3. **Register in CommandRouter**
   ```java
   commands.put("name", new CommandNameCommand());
   ```

4. **Rebuild**
   ```bash
   mvn clean package
   ```

## Command Guidelines

✅ Always add JavaDoc header with CMD, Description, Usage, Admin flag
✅ Parse arguments safely with `text.split(" ")`
✅ Check permissions with `hasPermission()`
✅ Use `bot.sendSuccess()` for success messages
✅ Use `bot.sendError()` for error messages
✅ Format messages with MessageUtils
✅ Return early on errors
✅ Keep methods focused and single-responsibility

## Example: Adding /hello Command

```java
// File: HelloCommand.java
public class HelloCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) {
        String name = message.getFrom().getFirstName();
        bot.sendSuccess(message.getChatId(), "Hello " + name + "!");
    }
    @Override
    public String getName() { return "hello"; }
    @Override
    public String getDescription() { return "Say hello"; }
    @Override
    public String getUsage() { return "/hello"; }
    @Override
    public boolean hasPermission(Message message) { return true; }
}

// In CommandRouter.java
commands.put("hello", new HelloCommand());
```

---

**All Rose Bot commands follow GoatBot-V2 structure and conventions!** 🌹
