const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
require("dotenv").config();
const fs = require("fs");
const { prefix } = require("./config.json");
const { spawn } = require("child_process");

client.once("ready", () => {
  console.log(
    "Bot '" +
      client.user.username +
      "#" +
      client.user.discriminator +
      "' is ready!"
  );
  client.user.setActivity("with Python", { type: "PLAYING" });
});

client.login(process.env.TOKEN);

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  console.log("Message by: " + message.author + " content: " + message.content);
  if (message.content === "up?") {
    console.log("Up? command triggered.");
    const prettyMilliseconds = require("pretty-ms");
    message.channel.send(
      "Yes! I've been up for: " + prettyMilliseconds(client.uptime)
    );
  }
  //if (message.content == 'working') {
  //    message.channel.send('Yup.');
  //}
  if (command === "js") {
    console.log("JS command triggered.");
    message.channel.send("JavaScript code shall be executed here");
  }
  if (command === "[python]") {
    console.log("Python command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[python]\n\nCommand [python] executes python code and sends back output to the discord channel.\nExample:\n\n`[python] x = "banana";\nprint(x);`\n\nOutput:\nbanana'
      );
    }
    //if (!args.length) {
    //    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    //}
    //else if (args[0] === 'yes') {
    //    return message.channel.send('no');
    //}
    //message.channel.send(`First: ${args[0]}`)
    //let oseviction = "sys.modules['os']=None;\n\n";
    const pythoncode = args.slice(0).join(" ");
    //sendcode = oseviction + pythoncode;
    fs.writeFile("main.py", pythoncode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Python code saved to main.py\nExecuting main.py\n-----------------------------------------"
    );
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn("python", ["main.py"]);
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      message.channel.send(dataToSend);
    });
  }
});
