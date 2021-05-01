let os = require("os");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
require("dotenv").config();
const fs = require("fs");
const { prefix } = require("./config.json");
const { spawn } = require("child_process");

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
client.once("ready", () => {
  console.log(
    "Bot '" +
      client.user.username +
      "#" +
      client.user.discriminator +
      "' is ready!"
  );
  let activityRandom = between(1, 2);
  if (activityRandom == 1) {
    client.user.setActivity("with Python", { type: "PLAYING" });
  } else if (activityRandom == 2) {
    client.user.setActivity("with Node.JS", { type: "PLAYING" });
  }
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
  if (command === "[pythoncheck]") {
    console.log("Sending main.py");
    try {
      var stats = fs.statSync("main.py");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./main.py"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[nodecheck]") {
    console.log("Sending execute.js");
    try {
      var stats = fs.statSync("execute.js");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./execute.js"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[langinfo]") {
  }
  if (command === "[node]") {
    console.log("JS command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[node]\n\nCommand [node] executes node code and sends back both output and errors to the discord channel.\nExample:\n\n`[node] let cool = 10";\nconsole.log(cool);`\n\nOutput:\n10\n\n\n**NOTE:** "require(\'os\')" has been removed to avoid vulnerabilities'
      );
    }
    const nodecode = args
      .slice(0)
      .join(" ")
      .replace('require("os");', "'Disabled';")
      .replace("require('os');", "'Disabled';");
    //.replace("import os", "# import os | Disabled to prevent exploits");
    /*if (pythoncode.includes(".env")) {
      let errorcode = "'.env' is not allowed.";
      return message.channel.send("Error: " + errorcode);
    }*/

    //sendcode = oseviction + pythoncode;
    fs.writeFile("execute.js", nodecode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Node.JS code saved to execute.js\nExecuting execute.js\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    // spawn new child process to call the python script
    const nodefile = spawn("node", ["execute.js"]);
    // collect data from script
    nodefile.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    nodefile.stderr.on("data", function (data) {
      errorToSend = data.toString().replace(os.userInfo().username, "******");
    });
    // in close event we are sure that stream from child process is closed
    nodefile.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```javascript\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```javascript\n" + errorToSend + "\n```");
      }
    });
  }

  if (command === "[python]") {
    let errorcode;
    console.log("Python command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[python]\n\nCommand [python] executes python code and sends back output to the discord channel.\nExample:\n\n`[python] x = "banana";\nprint(x);`\n\nOutput:\nbanana\n\n\n**NOTE:** "import os" has been removed to avoid vulnerabilities'
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
    const pythoncode = args
      .slice(0)
      .join(" ")
      .replace("import os", "# import os | Disabled to prevent exploits");
    /*if (pythoncode.includes(".env")) {
      let errorcode = "'.env' is not allowed.";
      return message.channel.send("Error: " + errorcode);
    }*/

    //sendcode = oseviction + pythoncode;
    fs.writeFile("main.py", pythoncode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Python code saved to main.py\nExecuting main.py\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    // spawn new child process to call the python script
    const python = spawn("python", ["main.py"]);
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.stderr.on("data", function (data) {
      errorToSend = data.toString().replace(os.userInfo().username, "******");
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(dataToSend + "\n" + errorToSend);
      if (dataToSend != undefined) {
        message.channel.send("```python\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```yaml\n" + errorToSend + "\n```");
      }
    });
  }
});
