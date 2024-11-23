# Assistant Service

An API for serving LLM models for conversation

For the endpoint `/chat` using the `POST` method the body should follow this schema
```json
{
  "question": "HERE THE QUESTION FOR THE BOT"
}
```

If you add the JWT Token, can be used for communicating with the Backend for applying
context in the LLM as a RAG