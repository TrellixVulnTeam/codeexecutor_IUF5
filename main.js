let os = require("os");
const botOwner = 301062520679170066;
const Discord = require("discord.js");
const client = new Discord.Client();
let maintenance = false;
client.commands = new Discord.Collection();
require("dotenv").config();
const fs = require("fs");
const { prefix } = require("./config.json");
const { exec } = require("child_process");
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
  let activityRandom = between(1, 3);
  if (activityRandom == 1) {
    client.user.setActivity("with Python", { type: "PLAYING" });
  } else if (activityRandom == 2) {
    client.user.setActivity("with Node.JS", { type: "PLAYING" });
  } else if (activityRandom == 3) {
    client.user.setActivity("with GO", { type: "PLAYING" });
  }

  if (fs.existsSync("externalfiles/main.py")) {
    fs.unlink("externalfiles/main.py", function (err) {
      if (err) console.log("main.py doesn't exist");
    });
  }
  if (fs.existsSync("externalfiles/execute.js")) {
    fs.unlink("externalfiles/execute.js", function (err) {
      if (err) console.log("execute.js doesn't exist");
    });
  }
  if (fs.existsSync("externalfiles/main.go")) {
    fs.unlink("externalfiles/main.go", function (err) {
      if (err) console.log("main.go doesn't exist");
    });
  }
});
const defaults = {
  cwd: "externalfiles/",
};
client.login(process.env.TOKEN);
client.on("message", (message) => {
  function working() {
    const workingEmbed = new Discord.MessageEmbed();
    workingEmbed.setColor("RED");
    workingEmbed.setAuthor("InimicalPart#6107");
    workingEmbed.setDescription(
      "Command Unavailable.\nThe bot is under maintenance."
    );
    workingEmbed.setThumbnail("https://i.imgur.com/8YU4Uej.png");
    workingEmbed.setTitle("Maintenance");
    message.channel.send(workingEmbed);
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  console.log("Message by: " + message.author + " content: " + message.content);
  if (message.content === "up?") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Up? command triggered.");
    const prettyMilliseconds = require("pretty-ms");
    message.channel.send(
      "Yes! I've been up for: " + prettyMilliseconds(client.uptime)
    );
  }

  if (command === "[pythoncheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending main.py");
    try {
      var stats = fs.statSync("externalfiles/main.py");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/main.py"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[nodecheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending execute.js");
    try {
      var stats = fs.statSync("externalfiles/execute.js");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/execute.js"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[langinfo]") {
    if (maintenance) {
      working();
      return;
    }
    message.channel.send(
      "Getting version information...\n--------------------------"
    );
    var dataToSendP;
    var dataToSendN;
    var dataToSendG;
    const goversion = spawn("go", ["version"], defaults);

    goversion.stdout.on("data", function (data) {
      dataToSendG = data.toString().split(" ");
    });
    goversion.on("close", (code) => {
      message.channel.send("Go: " + dataToSendG[2]);
    });

    const nodeversion = spawn("node", ["-v"], defaults);
    nodeversion.stdout.on("data", function (data) {
      dataToSendN = data.toString();
    });
    nodeversion.on("close", (code) => {
      message.channel.send("Node.JS: " + dataToSendN);
    });

    const pythonversion = spawn("python", ["--version"], defaults);
    pythonversion.stdout.on("data", function (data) {
      dataToSendP = data.toString();
    });
    pythonversion.on("close", (code) => {
      if (dataToSendP != undefined) {
        message.channel.send("Python: " + dataToSendP);
      }
    });
  }
  if (command === "[gocheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending main.go");
    try {
      var stats = fs.statSync("externalfiles/main.go");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/main.go"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[go]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("go command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[go]\n\nCommand [go] executes GO code and sends back both output and errors to the discord channel.\nExample:\n\n`[go] package main\nimport "fmt"\nfunc main() {\n    var b int = 1\n    fmt.Println(b)\n}`\n\nOutput:\n1\n\n\n**NOTE:** "os/exec" and "runtime" have been removed to avoid vulnerabilities'
      );
    }
    const gocode = args
      .slice(0)
      .join(" ")
      .replace(/"os\/exec"/g, '// "os/exec" | Disabled to avoid vulnerabilites')
      .replace(/"runtime"/g, '// "runtime" | Disabled to avoid vulnerabilites')
      .replace(/'os\/exec'/g, "// 'os/exec' | Disabled to avoid vulnerabilites")
      .replace(/'runtime'/g, "// 'runtime' | Disabled to avoid vulnerabilites")
      .replace(/..\//g, "")
      .replace(/..\\/g, "");
    fs.writeFileSync("externalfiles/main.go", gocode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "GO code saved to main.go\nExecuting main.go\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const go = spawn("go", ["run", "main.go"], defaults);
    go.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    go.stderr.on("data", function (data) {
      errorToSend = data.toString().replace(os.userInfo().username, "******");
    });
    go.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```go\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```go\n" + errorToSend + "\n```");
      }
    });
  }
  if (command === "[maintenance]") {
    if (message.author != botOwner) {
      return message.channel.send("This command is only for owners.");
    }
    if (maintenance) {
      maintenance = false;
      let activityRandom = between(1, 3);
      if (activityRandom == 1) {
        client.user.setPresence({
          activity: { name: "with Python", type: "PLAYING" },
          status: "online",
        });
        client.user.setPresence({
          activity: { name: "with Python", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 2) {
        client.user.setPresence({
          activity: { name: "with Node.JS", type: "PLAYING" },
          status: "online",
        });
        client.user.setPresence({
          activity: { name: "with Node.JS", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 3) {
        client.user.setPresence({
          activity: { name: "with GO", type: "PLAYING" },
          status: "online",
        });
        client.user.setPresence({
          activity: { name: "with GO", type: "PLAYING" },
          status: "online",
        });
      }
      message.channel.send("Maintenance mode has been turned off");
    } else {
      maintenance = true;
      client.user.setPresence({
        activity: { name: "Under Maintenance", type: "LISTENING" },
        status: "dnd",
      });
      client.user.setPresence({
        activity: { name: "Under Maintenance", type: "LISTENING" },
        status: "dnd",
      });
      message.channel.send("Maintenance mode has been turned on");
    }
  }
  if (command === "[info]") {
    if (maintenance) {
      working();
      return;
    }
    message.channel.send(
      "**CodeExecuter**\n" +
        "\n" +
        "This bot was designed to test your code in a discord server. This makes it so you don't have to worry about installing languages on your computer to test them.\n" +
        "\n" +
        "Currently supported languages\n--------------------------\n" +
        "`[go]` as Go\n" +
        "`[node]` as Node.JS / `[npm]` for Node Package Manager\n" +
        "`[python]` as Python"
    );
  }
  if (command === "[node]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("JS command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[node]\n\nCommand [node] executes node code and sends back both output and errors to the discord channel.\nExample:\n\n`[node] let cool = 10";\nconsole.log(cool);`\n\nOutput:\n10\n\n\n**NOTE:** "require(\'os\')" and "require(\'fs\')" have been removed to avoid vulnerabilities'
      );
    }
    const nodecode = args
      .slice(0)
      .join(" ")
      .replace(/require("os")/g, "'Disabled'")
      .replace(/require('os')/g, "'Disabled'")
      .replace(/..\//g, "")
      .replace(/..\\/g, "");
    fs.writeFile("externalfiles/execute.js", nodecode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Node.JS code saved to execute.js\nExecuting execute.js\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const nodefile = spawn("node", ["execute.js"], defaults);
    nodefile.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    nodefile.stderr.on("data", function (data) {
      errorToSend = data
        .toString()
        .replace(os.userInfo().username, "******")
        .replace(/externalfiles\\/g, "");
    });
    nodefile.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```javascript\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```javascript\n" + errorToSend + "\n```");
      }
    });
  }
  if (command === "[npm]") {
    if (maintenance) {
      working();
      return;
    }
    if (!args.length) {
      return message.channel.send(
        "[npm]\n\nCommand [npm] is for Node Package Manager which installs and uninstalls packages required for node. \nExample:\n\n`[npm] install fs`\n\nOutput:\nadded 1 package, and audited 2 packages in 1s\nfound 0 vulnerabilites"
      );
    }
    try {
      const [_, type, pkg] = message.content.split(" ");
      if (type == "install" || type == "i" || type == "uninstall") {
      } else {
        return message.channel.send(
          "`[CE] Invalid syntax. Example: [npm] <install/uninstall> fs`"
        );
      }
      const cmd = "npm --prefix ./externalfiles/ " + type + " " + pkg;
      const child = exec(cmd);
      child.stdout.on("data", (d) =>
        message.channel.send("```javascript\n" + d + "```")
      );
      child.stderr.on("data", (d) =>
        message.channel.send("```javascript\n" + d + "```")
      );
      setTimeout((_) => {
        if (!child.killed) child.kill("SIGKILL");
      }, 120000);
    } catch {
      message.channel.send(
        "`[CE] Invalid syntax. Example: [npm] <install/uninstall> fs`"
      );
    }
  }
  if (command === "[python]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Python command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[python]\n\nCommand [python] executes python code and sends back output to the discord channel.\nExample:\n\n`[python] x = "banana";\nprint(x);`\n\nOutput:\nbanana\n\n\n**NOTE:** "import os" has been removed to avoid vulnerabilities'
      );
    }
    const pythoncode = args
      .slice(0)
      .join(" ")
      .replace(/import os/g, "# import os | Disabled to prevent exploits")
      .replace(/..\//g, "")
      .replace(/..\\/g, "");
    fs.writeFile("externalfiles/main.py", pythoncode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Python code saved to main.py\nExecuting main.py\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const python = spawn("python", ["main.py"], defaults);
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.stderr.on("data", function (data) {
      errorToSend = data.toString().replace(os.userInfo().username, "******");
    });
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
