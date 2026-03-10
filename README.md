# MCP-Enabled Task System (MTS)

MTS synchronizes a MongoDB-backed Kanban workflow across two interfaces:

- An MCP server for AI-assisted task operations
- A Pixoo 64 display that cycles through live task cards
## Overview
This project has two main apps:

- Kanban_MCP: TypeScript MCP server for task creation, status updates, priority updates, tags, and analytics prompts.
- Interface: Python app that reads tasks from MongoDB and renders them on a Pixoo device.


Both apps share the same MongoDB collections, so changes made through MCP are reflected in the Pixoo display.

## Features
- Create and manage tasks through MCP tools
- Move tasks across todo, inProgress, and done
- Add task tags and set task priority
- Request task analytics from an MCP prompt
- Display todo and in-progress tasks on Pixoo
- Shared root environment config through .env
## Repository Structure
- Kanban_MCP: MCP server source and build output
- Interface: Pixoo display interface
- [mets_install.py](mets_install.py): Dependency install and MCP build helper
- [mcp.json](.vscode/mcp.json): VS Code MCP server config

## Prerequisites
The MongoDB containing the tasks is from one of my other project [kanban](https://github.com/0Thomas1/kanban). This program can only work on a DB with the same document.

  The Schema are as follows:

  ### tasks:
  ```js
  const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    taskStatus: String,
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });
  ```

  ### users:

  ```js
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  });
  ```
## Evironment variables
Create or update .env in the repository root with
```.env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
USER_NAME=your_username_for_interface
PIXOO_IP=your_pixoo_device_ip
KANBAN_USERNAME=${USER_NAME}
```

## Installation
```bash 
python3 mets_install.py
```

## Running

## MCP Capabilities
Defined in [index.ts](Kanban_MCP/src/index.ts):

- Tool: create-task
- Tool: move-task
- Tool: set-prioity
- Tool: add-tag
- Resource: tasks://all
- Prompt: tasks-analytics
