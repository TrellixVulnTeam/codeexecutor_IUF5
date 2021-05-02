const prettyMilliseconds = require("pretty-ms");
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
const search = os.userInfo().username;
const search2 = "\\.\\./";
const search3 = "\\.\\.\\\\";
const replacer = new RegExp(search, "g");
const replacer2 = new RegExp(search2, "g");
const replacer3 = new RegExp(search3, "g");
client.once("ready", () => {
  console.log(
    "Bot '" +
      client.user.username +
      "#" +
      client.user.discriminator +
      "' is ready!"
  );
  let activityRandom = between(1, 6);
  if (activityRandom == 1) {
    client.user.setPresence({
      activity: { name: "with Python", type: "PLAYING" },
      status: "online",
    });
  } else if (activityRandom == 2) {
    client.user.setPresence({
      activity: { name: "with Node.JS", type: "PLAYING" },
      status: "online",
    });
  } else if (activityRandom == 3) {
    client.user.setPresence({
      activity: { name: "with GO", type: "PLAYING" },
      status: "online",
    });
  } else if (activityRandom == 4) {
    client.user.setPresence({
      activity: { name: "with Bash", type: "PLAYING" },
      status: "online",
    });
  } else if (activityRandom == 5) {
    client.user.setPresence({
      activity: { name: "with Batch", type: "PLAYING" },
      status: "online",
    });
  } else if (activityRandom == 6) {
    client.user.setPresence({
      activity: { name: "with Lua", type: "PLAYING" },
      status: "online",
    });
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
  if (fs.existsSync("externalfiles/main.bat")) {
    fs.unlink("externalfiles/main.bat", function (err) {
      if (err) console.log("main.bat doesn't exist");
    });
  }
  if (fs.existsSync("externalfiles/main.sh")) {
    fs.unlink("externalfiles/main.sh", function (err) {
      if (err) console.log("main.sh doesn't exist");
    });
  }
  if (fs.existsSync("externalfiles/main.lua")) {
    fs.unlink("externalfiles/main.lua", function (err) {
      if (err) console.log("main.lua doesn't exist");
    });
  }
  if (fs.existsSync("externalfiles/versions.bat")) {
    fs.unlink("externalfiles/versions.bat", function (err) {
      if (err) console.log("versions.bat doesn't exist");
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

  if (command === "[uptime]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Up? command triggered.");
    message.channel.send(
      client.user.username +
        " has been up for: " +
        prettyMilliseconds(client.uptime)
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
  if (command === "[bashcheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending main.sh");
    try {
      var stats = fs.statSync("externalfiles/main.sh");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/main.sh"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[batchcheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending main.bat");
    try {
      var stats = fs.statSync("externalfiles/main.bat");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/main.bat"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[luacheck]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Sending main.lua");
    try {
      var stats = fs.statSync("externalfiles/main.lua");
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMegabytes > 8) {
        message.channel.send("File size exceeds 8 MB.");
      } else {
        message.channel.send("", {
          files: ["./externalfiles/main.lua"],
        });
      }
    } catch (err) {
      message.channel.send("File doesn't exist.");
    }
  }
  if (command === "[versions]") {
    if (maintenance) {
      working();
      return;
    }
    message.channel.send("Getting versions...\n--------------------------");
    var dataToSendP;
    var dataToSendN;
    var dataToSendG;
    var dataToSendB;
    var dataToSendL;
    var dataToSendBa;
    const luaversion = spawn("lua", ["-v"], defaults);
    luaversion.stdout.on("data", function (data) {
      dataToSendL = data.toString().split(" ")[1];
    });
    luaversion.on("close", (code) => {
      const bashversion = spawn("bash", ["--version"], defaults);
      bashversion.stdout.on("data", function (data) {
        dataToSendB = data.toString().split("\n")[0].split(" ")[3];
      });
      bashversion.on("close", (code) => {
        const goversion = spawn("go", ["version"], defaults);
        goversion.stdout.on("data", function (data) {
          dataToSendG = data.toString().split(" ");
        });
        goversion.on("close", (code) => {
          const nodeversion = spawn("node", ["-v"], defaults);
          nodeversion.stdout.on("data", function (data) {
            dataToSendN = data.toString();
          });
          nodeversion.on("close", (code) => {
            const pythonversion = spawn("python", ["--version"], defaults);
            pythonversion.stdout.on("data", function (data) {
              dataToSendP = data.toString().split(" ")[1];
            });
            pythonversion.on("close", (code) => {
              if (dataToSendP != undefined) {
                const batchversion = spawn("cmd", ["/c", "ver"], defaults);
                batchversion.stdout.on("data", function (data) {
                  dataToSendBa = data.toString().replace("]", "").split(" ")[3];
                });
                batchversion.on("close", (code) => {
                  message.channel.send(
                    "Lua: " +
                      dataToSendL +
                      "\nBash: " +
                      dataToSendB +
                      "\nGo: " +
                      dataToSendG[2] +
                      "\nNode.JS: " +
                      dataToSendN +
                      "Python: " +
                      dataToSendP +
                      "Batch: " +
                      dataToSendBa
                  );
                });
              }
            });
          });
        });
      });
    });
  }

  if (command === "[batch]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("Batch command triggered.");
    if (!args.length) {
      return message.channel.send(
        "[batch]\n\nCommand [batch] executes BATCH code and sends back both output and errors to the discord channel.\nExample:\n\n`[batch] echo hello`\n\nOutput:\nhello"
      );
    }
    const batchcode = args
      .slice(0)
      .join(" ")
      .replace(replacer2, "")
      .replace(replacer3, "")
      .replace(/\\CodeExecuter/g, "")
      .replace(/\/CodeExecuter/g, "")
      .replace(/cd/g, "");
    fs.writeFileSync(
      "externalfiles/main.bat",
      batchcode,
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
    message.channel.send(
      "Batch code saved to main.bat\nExecuting main.bat\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const batch = spawn("cmd", ["/c", "main.bat"], defaults);
    batch.stdout.on("data", function (data) {
      dataToSend = data
        .toString()
        .replace(replacer, "******")
        .replace(/\\externalfiles/g, "");
    });
    batch.stderr.on("data", function (data) {
      errorToSend = data
        .toString()
        .replace(replacer, "******")
        .replace(/\\externalfiles/g, "");
    });
    batch.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```bat\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```bat\n" + errorToSend + "\n```");
      }
    });
  }

  if (command === "[lua]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("lua command triggered.");
    if (!args.length) {
      return message.channel.send(
        "[lua]\n\nCommand [lua] executes lua code and sends back both output and errors to the discord channel.\nExample:\n\n`[lua] l = 10`\nprint(l)\n\nOutput:\n10"
      );
    }
    const luacode = args
      .slice(0)
      .join(" ")
      .replace(replacer2, "")
      .replace(replacer3, "");
    fs.writeFileSync("externalfiles/main.lua", luacode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Lua code saved to main.lua\nExecuting main.lua\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const lua = spawn("lua", ["main.lua"], defaults);
    lua.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    lua.stderr.on("data", function (data) {
      errorToSend = data.toString().replace(replacer, "******");
    });
    lua.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```lua\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```lua\n" + errorToSend + "\n```");
      }
    });
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
      .replace(replacer2, "")
      .replace(replacer3, "");
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
      errorToSend = data.toString().replace(replacer, "******");
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
      if (activityRandom == 1) {
        client.user.setPresence({
          activity: { name: "with Python", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 2) {
        client.user.setPresence({
          activity: { name: "with Node.JS", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 3) {
        client.user.setPresence({
          activity: { name: "with GO", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 4) {
        client.user.setPresence({
          activity: { name: "with Bash", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 5) {
        client.user.setPresence({
          activity: { name: "with Lua", type: "PLAYING" },
          status: "online",
        });
      } else if (activityRandom == 6) {
        client.user.setPresence({
          activity: { name: "with Batch", type: "PLAYING" },
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
        "`[node]` as Node.JS /`[npm]` for Node Package Manager\n" +
        "`[python]` as Python /`[pip]` for Python Package Manager\n" +
        "`[bash]` as Bash\n" +
        "`[lua]` as Lua\n" +
        "`[batch]` as Batch\n"
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
        '[node]\n\nCommand [node] executes node code and sends back both output and errors to the discord channel.\nExample:\n\n`[node] let cool = 10";\nconsole.log(cool);`\n\nOutput:\n10\n\n\n**NOTE:** "require(\'os\')" has been removed to avoid vulnerabilities'
      );
    }
    const nodecode = args
      .slice(0)
      .join(" ")
      .replace(/require("os")/g, "'Disabled'")
      .replace(/require('os')/g, "'Disabled'")
      .replace(replacer2, "")
      .replace(replacer3, "");
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
        .replace(replacer, "******")
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

  if (command === "[bash]") {
    if (maintenance) {
      working();
      return;
    }
    console.log("BASH command triggered.");
    if (!args.length) {
      return message.channel.send(
        '[bash]\n\nCommand [bash] executes bash code and sends back both output and errors to the discord channel.\nExample:\n\n`[bash] bananas="Jello"\necho "$bananas"`\n\nOutput:\nJello\n\n\n'
      );
    }
    const nodecode = args
      .slice(0)
      .join(" ")
      .replace(replacer, "******")
      .replace(replacer2, "")
      .replace(replacer3, "")
      .replace(/cd/g, "");
    fs.writeFile("externalfiles/main.sh", nodecode, function (err, result) {
      if (err) console.log("error", err);
    });
    message.channel.send(
      "Bash code saved to main.sh\nExecuting main.sh\n-----------------------------------------"
    );
    var dataToSend;
    var errorToSend;
    const bashfile = spawn("bash", ["main.sh"], defaults);
    bashfile.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    bashfile.stderr.on("data", function (data) {
      errorToSend = data
        .toString()
        .replace(replacer, "******")
        .replace(/externalfiles\\/g, "");
    });
    bashfile.on("close", (code) => {
      if (dataToSend != undefined) {
        message.channel.send("```bash\n" + dataToSend + "\n```");
      }
      if (errorToSend != undefined) {
        message.channel.send("```bash\n" + errorToSend + "\n```");
      }
    });
  }
  if (command === "[pip]") {
    if (maintenance) {
      working();
      return;
    }
    if (!args.length) {
      return message.channel.send(
        "[pip]\n\nCommand [pip] is for Python Package Manager which installs and uninstalls packages required for python. \nExample:\n\n`[pip] install requests`\n\nOutput:\nRequirement already satisfied: requests in c:\\python39\\lib\\site-packages (2.25.1)"
      );
    }
    try {
      const [_, type, pkg] = message.content.split(" ");
      if (type == "install" || type == "uninstall") {
      } else {
        return message.channel.send(
          "`[CE] Invalid syntax. Example: [pip] <install/uninstall> requests`"
        );
      }
      if (type == "uninstall") {
        type = "uninstall --yes";
      }
      const cmd = "pip " + type + " " + pkg;
      const child = exec(cmd);
      child.stdout.on("data", (d) =>
        message.channel.send(
          "```python\n" + d.replace(replacer, "******") + "```"
        )
      );
      child.stderr.on("data", (d) =>
        message.channel.send(
          "```python\n" + d.replace(replacer, "******") + "```"
        )
      );
      setTimeout((_) => {
        if (!child.killed) child.kill("SIGKILL");
      }, 120000);
    } catch {
      message.channel.send(
        "`[CE] Invalid syntax. Example: [pip] <install/uninstall> requests`"
      );
    }
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
        message.channel.send(
          "```javascript\n" + d.replace(replacer, "******") + "```"
        )
      );
      child.stderr.on("data", (d) =>
        message.channel.send(
          "```javascript\n" + d.replace(replacer, "******") + "```"
        )
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
      .replace(replacer2, "")
      .replace(replacer3, "");
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
      errorToSend = data.toString().replace(replacer, "******");
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
