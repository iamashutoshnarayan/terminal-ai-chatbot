import readline from "readline/promises";
import { stdin, stdout } from "process";
import chalk from "chalk";
import dotenv from "dotenv";

import { getResponse } from "./utils/fallback.js";

dotenv.config();

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

let currentModel = "groq";

console.log(
  chalk.green(
    "\nAI Terminal Chat Started\n"
  )
);

console.log(
  chalk.yellow(
    "Commands: /groq /gemini /help /clear /exit\n"
  )
);

while (true) {
  const input = await rl.question(
    chalk.blue("You: ")
  );

  if (!input.trim()) {
    console.log(
      chalk.red("Please enter a prompt.\n")
    );
    continue;
  }

  switch (input.toLowerCase()) {
    case "/groq":
      currentModel = "groq";
      console.log(
        chalk.green(
          "Using Groq Model\n"
        )
      );
      continue;

    case "/gemini":
      currentModel = "gemini";
      console.log(
        chalk.green(
          "Using Gemini Model\n"
        )
      );
      continue;

    case "/help":
      console.log(`
Available Commands:

/groq
/gemini
/help
/clear
/exit
`);
      continue;

    case "/clear":
      console.clear();
      continue;

    case "/exit":
      console.log(
        chalk.yellow("Goodbye!")
      );
      rl.close();
      process.exit(0);
  }

  try {
    console.log(
      chalk.gray(
        `Generating response using ${currentModel}...\n`
      )
    );

    const response =
      await getResponse(
        input,
        currentModel
      );

    console.log(
      chalk.green(
        `AI: ${response}\n`
      )
    );
  } catch (error) {
    console.log(
      chalk.red(
        `Error: ${error.message}\n`
      )
    );
  }
}