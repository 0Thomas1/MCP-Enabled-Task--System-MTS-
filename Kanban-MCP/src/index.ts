import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";
import * as mongooseUtils from "./utils/mongoose";
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new McpServer({
  name: "kanban-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
});

server.resource(
  "tasks",
  "tasks://all",
  {
    description: "Get all tasks from the database",
    title: "Tasks",
    mimeType: "application/json",
  },
  async (uri) => {
    // Don't block on DB init here; getTasks will fall back to cache if needed
    let tasks = await mongooseUtils.getTasks();
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(tasks),
          mimeType: "application/json",
        },
      ],
    };
  }
);
// Create a new task
server.tool(
  "create-task",
  "create a new todo task",
  {
    task_title: z.string(),
    description: z.string(),
  },
  {
    title: "create a todo task",
    readonlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params) => {
    try {
      await mongooseUtils.createTask(params);
      return {
        content: [
          {
            type: "text",
            text: `Task "${params.task_title}" created successfully!`,
          },
        ],
      };
    } catch {
      return {
        content: [
          { type: "text", text: "An error occurred while creating the task." },
        ],
      };
    }
  }
);
// set status
server.tool(
  "move-task",
  "move a task to a different status",
  {
    task_id: z.string(),
    new_status: z.enum(["todo", "inProgress", "done"]),
  },
  {
    title: "move a task to a different status",
    readonlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params) => {
    try {
      await mongooseUtils.moveTask(params.task_id, params.new_status);
      return {
        content: [
          {
            type: "text",
            text: `Task "${params.task_id}" moved to "${params.new_status}" successfully!`,
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text",
            text: `Failed to move task "${params.task_id}" to "${params.new_status}".`,
          },
        ],
      };
    }
  }
);

// set priority
server.tool(
  "set-prioity",
  "set a task to a different priority",
  {
    task_id: z.string(),
    new_priority: z.enum(["low", "medium", "high"]),
  },
  {
    title: "set a task to a different priority",
    readonlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async (params) => {
    try {
      await mongooseUtils.setTaskPriority(params.task_id, params.new_priority);
      return {
        content: [
          {
            type: "text",
            text: `Set task "${params.task_id}" Priority to "${params.new_priority}" successfully!`,
          },
        ],
      };
    } catch {
      return {
        content: [
          {
            type: "text",
            text: `Failed to set task "${params.task_id}" priority to "${params.new_priority}".`,
          },
        ],
      };
    }
  }
);
// show analytics
server.prompt("tasks-analytics", "get analytics for users tasks", async () => {
  let tasks_stats = await getTasksStats();
  const statsString = JSON.stringify(tasks_stats, null, 2);
  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `analize the lead time and current tasks status distribution from the given tasks stats and present them in a table:${statsString}`,
        },
      },
    ],
  };
});
//add tag
server.tool("add-tag", "add tags to a tasks",{
    task_tag: z.string(),
    task_id: z.string()
},async (params)=>{
    try {
        await mongooseUtils.addTaskTag(params.task_id,params.task_tag);
        return{
            content: [
          {
            type: "text",
            text: `Added tag "${params.task_tag}" to tasks"${params.task_id}" successfully.`,
          },
        ],
        }
    } catch {
        return{
            content: [
          {
            type: "text",
            text: `Failed to add tag "${params.task_tag}" to tasks"${params.task_id}".`,
          },
        ],
        }
    }
});
// analytics
async function getTasksStats() {
  const tasks = await mongooseUtils.getTasks();
  const tasks_count = tasks.length;
  let inProgress_count = 0;
  let done_count = 0;

  tasks.forEach((task) => {
    if (task.taskStatus == "done") {
      done_count++;
    }
    if (task.taskStatus == "inProgress") {
      inProgress_count++;
    }
  });
  return {
    all_tasks: tasks,
    tasks_count: tasks_count,
    inProgress_count: inProgress_count,
    todo_count: tasks_count - inProgress_count - done_count,
    done_count: done_count,
  };
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Initialize DB in the background so we don't block MCP initialize handshake
  mongooseUtils.initDb.catch((err) => {
    console.error("DB initialization failed:", err);
  });
}
main();
