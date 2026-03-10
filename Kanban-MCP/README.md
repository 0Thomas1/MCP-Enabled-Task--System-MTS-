# Kanban-MCP

A Model Context Protocol (MCP) server for managing Kanban-style tasks with analytics, built using Node.js, TypeScript, and MongoDB (via Mongoose).

## Features

- Create, update, and manage tasks with priorities, tags, and statuses (todo, inProgress, done)
- Task analytics: lead time, cycle time, and status distribution
- MCP-compliant server with stdio transport
- MongoDB integration with user-based task filtering
- Task caching for performance

## Project Structure

```
Kanban-MCP/
├── src/
│   ├── index.ts            # Main MCP server logic
│   └── utils/
│       ├── mongoose.ts     # Mongoose DB utilities
│       ├── Task.d.ts       # Task type definitions
│       └── User.d.ts       # User type definitions
├── build/                  # Compiled JS output
├── .vscode/mcp.json        # MCP server config
├── package.json            # NPM dependencies and scripts
├── tsconfig.json           # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance

### Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Kanban-MCP
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory with:
     ```env
     MONGODB_URI=your_mongodb_uri
     KANBAN_USERNAME=your_username
     DBNAME=your_db_name
     ```
4. Build the project:
   ```sh
   npm run build
   ```
5. Start the MCP server:
    When starting the repo, VS Code will prompt you to start the MCP server.

## Usage

- The server exposes MCP tools for creating, moving, and prioritizing tasks.
- Analytics can be retrieved via the `tasks-analytics` prompt.
- See `src/index.ts` for tool and prompt definitions.

## Development

- Source code is in `src/`, compiled output in `build/`.
- TypeScript is used for type safety and modern JS features.
- Use the provided VS Code MCP config for local development.

## License

MIT
## Tech Stack

- **Node.js**: JavaScript runtime for server-side logic
- **TypeScript**: Strongly-typed language for safer code
- **MongoDB**: NoSQL database for task storage
- **Mongoose**: ODM for MongoDB integration
- **VS Code MCP**: Integration for Model Context Protocol tools