# Token Orchestrator

## Overview
Token Orchestrator is a server application designed to generate, assign, and manage API keys efficiently. It provides endpoints for creating, retrieving, updating, and deleting keys while maintaining their lifecycle and availability. The system ensures optimal performance and scalability through efficient key management strategies.

---

## Features
- **Key Creation**: Generate new API keys with a lifecycle of 5 minutes.
- **Key Retrieval**: Assign a random, available key to a client.
- **Key Unblocking**: Unblock previously assigned keys for reuse.
- **Key Removal**: Permanently remove keys from the system.
- **Key Keep-Alive**: Extend the lifespan of keys through periodic keep-alive signals.
- **Automatic Key Management**: Release blocked keys after 60 seconds if not explicitly unblocked.

---

## Endpoints
### 1. `POST /keys`
- **Description**: Generates a new API key.
- **Response Status**: `201`

### 2. `GET /keys`
- **Description**: Retrieves a random available key for client use. The key is blocked until explicitly unblocked.
- **Response Status**:
  - `200`: Returns a key.
    ```json
    { "keyId": "<keyID>" }
    ```
  - `404`: No available keys.
    ```json
    {}
    ```

### 3. `GET /keys/:id`
- **Description**: Fetches information about a specific key.
- **Response Status**:
  - `200`: Key information.
    ```json
    {
      "isBlocked" : "<true> / <false>",
      "blockedAt" : "<blockedTime>",
      "createdAt" : "<createdTime>"
    }
    ```
  - `404`: Key not found.

### 4. `DELETE /keys/:id`
- **Description**: Permanently deletes a key.
- **Response Status**:
  - `200`: Key successfully deleted.
  - `404`: Key not found.

### 5. `PUT /keys/:id`
- **Description**: Unblocks a previously assigned key, making it available for reuse.
- **Response Status**:
  - `200`: Key successfully unblocked.
  - `404`: Key not found.

### 6. `PUT /keepalive/:id`
- **Description**: Sends a keep-alive signal to extend the lifespan of a specific key.
- **Response Status**:
  - `200`: Keep-alive signal successful.
  - `404`: Key not found.

---

## Constraints
- Keys are deleted automatically if a keep-alive signal is not sent within 5 minutes.
- Blocked keys are automatically released after 60 seconds if not explicitly unblocked.
- The system is designed for optimal efficiency, targeting O(log n) or O(1) complexity for operations.

---

## How to Run
1. Clone the repository.
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the server.
   ```bash
   npm start
   ```
4. The server will run on `http://localhost:<port>`.

---

## Example Usage
### Generate a Key
```bash
curl -X POST http://localhost:<port>/keys
```

### Retrieve an Available Key
```bash
curl -X GET http://localhost:<port>/keys
```

### Get Key Information
```bash
curl -X GET http://localhost:<port>/keys/<keyID>
```

### Unblock a Key
```bash
curl -X PUT http://localhost:<port>/keys/<keyID>
```

### Delete a Key
```bash
curl -X DELETE http://localhost:<port>/keys/<keyID>
```

### Keep a Key Alive
```bash
curl -X PUT http://localhost:<port>/keepalive/<keyID>
```

---

## Future Enhancements
- Support for persistent storage (e.g., database integration).
- Advanced authentication and authorization mechanisms.
- Support for custom key expiry durations.
- Detailed logging and monitoring of key activities.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributions
Contributions are welcome! Feel free to submit a pull request or raise an issue in the repository.

---

## Contact
For any queries or support, please contact [321prakhar0039@dbit.in].

