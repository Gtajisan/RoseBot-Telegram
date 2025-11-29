# 📊 Dashboard API

REST API endpoints for monitoring and management.

## Endpoints

- `GET /api/health` - Health check
- `GET /api/stats` - Bot statistics
- `GET /api/status` - Bot status

## Configuration

Port: 3000
Base URL: `http://localhost:3000`

## Usage

```bash
curl http://localhost:3000/api/stats
```

## Response Format

```json
{
  "users": 100,
  "messages": 1000,
  "chats": 50,
  "memory": 256,
  "maxMemory": 512
}
```
