const axios = require("axios");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const dotenv = require('dotenv');

dotenv.config();
axios.defaults.baseURL = process.env.BASE_URL;

const menu = {
  name: "Options",
  type: "list",
  choices: ["Customers", "Cruisers", "Match", "Manual", "Exit"],
};

const getSelectedMenuItem = () => {

  return inquirer.prompt(menu);
}

const run = async () => {
  const { Options } = await getSelectedMenuItem();
  switch (Options) {
    case "Customers": {
      const response = await axios.get("/customer");
      console.log(response.data);
      break;
    }
    case "Cruisers": {
      const response = await axios.get("/driver");
      console.log(response.data);
      break;
    }
    case "Match": {
      const response = await axios.get("/match");
      console.log(response.data);
      break;
    }
    case "Manual": {
      console.log("Options:");
      console.log("- customer:", "Show existing list of customers");
      console.log("- cruiser:", "Show existing list of cruisers");
      console.log(
        "- match:", "\n", 
        "  - Show each customer and assigned driver", "\n", 
        "  - List of failed fulfilment customers if any exists.", "\n", 
        "  - List of idle drivers if any exist.")
      console.log("- manual:", "Show this help.");
      console.log("- exit:", "Kill the CLI (and the rest of the application");
      break;
    }
    default:
      console.log("Bye!");
      break;
  }
};

clear(); // Clear terminal
console.log(chalk.yellow(figlet.textSync("con cruise"))); // Header
run(); // Start the CLI
