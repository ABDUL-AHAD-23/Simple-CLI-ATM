#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.yellowBright("WELCOME TO AHAD ATM"));
let user = await inquirer.prompt([
    {
        type: "input",
        name: "accountHolderName",
        message: "Please enter your account holder name:",
        default: "MR. ABDUL AHAD"
    },
    {
        name: "PIN",
        type: "number",
        message: "Enter your 4-digit PIN:"
    },
    {
        name: "accountType",
        type: "list",
        message: "Select your account type:",
        choices: ["CURRENT", "SAVING"]
    },
    {
        name: "transactionType",
        type: "list",
        message: "Select your transaction type:",
        choices: ["CASH", "WITHDRAWAL"]
    },
    {
        type: "list",
        name: "amount",
        message: "Select your amount:",
        choices: ["500", "1000", "5000", "10000"],
        when(user) {
            return user.transactionType === "CASH";
        },
    },
    {
        name: "amount",
        type: "number",
        message: "Enter your amount:",
        when(user) {
            return user.transactionType === "WITHDRAWAL";
        },
    }
]);
if (user.PIN) {
    const balance = Math.floor(Math.random() * 10000 + 1);
    console.log(`Your current balance is: ${balance}`);
    const enteredAmount = user.amount;
    if (enteredAmount <= balance) {
        const remaining = balance - enteredAmount;
        console.log(`You have withdrawn ${enteredAmount} rupees. Your remaining balance is ${remaining} rupees.`);
    }
    else {
        console.log("Insufficient balance.");
    }
}
else {
    console.log("Invalid PIN entered.");
}
