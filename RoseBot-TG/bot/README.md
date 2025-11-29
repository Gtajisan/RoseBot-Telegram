# 🤖 Bot Commands

All bot commands are organized here following GoatBot-V2 structure.

## Directories

- **commands/** - Command implementations
- **handlers/** - Event and message handlers
- **middleware/** - Command middleware & permissions

## Command Structure

Each command is a separate class implementing `ICommand` interface:

```java
public class MyCommand implements ICommand {
    @Override
    public void execute(Message message, RoseBot bot) { ... }
}
```

## Adding Commands

1. Create file in `src/main/java/com/rosebot/commands/impl/`
2. Implement `ICommand` interface
3. Register in `CommandRouter.registerCommands()`
4. Rebuild: `mvn clean package`

## Available Commands

See `COMMAND_STRUCTURE.md` for full list and examples.
