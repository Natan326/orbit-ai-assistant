# Orbit AI Assistant

A simple Node.js server that connects to OpenAI ChatGPT and responds to assistant messages.

## Setup

1. Create a `.env` file with your OpenAI API key.
2. Run `npm install`
3. Run `npm start`

Then POST to `/api/assistant` with:

```json
{ "message": "כמה עובדים יש לי?" }
```