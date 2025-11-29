# 🌐 Languages

Multi-language support structure.

## Current Languages

- English (implemented)
- [Add more languages here]

## Language Interface

```java
public interface Language {
    String getWelcome();
    String getHelp();
    String getError(String message);
    String getSuccess(String message);
}
```

## Adding Language

1. Create class implementing `Language`
2. Register in `LanguageManager`
3. Use `LanguageManager.getInstance().getLanguage("code")`

## Example

```java
public class FrenchLanguage implements Language {
    @Override
    public String getWelcome() {
        return "Bienvenue!";
    }
}
```
