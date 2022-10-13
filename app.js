const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Use the saved values
const client = new Client({
  puppeteer: { headless: true },
  authStrategy: new LocalAuth({ dataPath: "./session" }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "hai") {
    message.reply("kenapa cuk :v");
  }
});

client.on("message", async (msg) => {
  const mentions = await msg.getMentions();

  for (let contact of mentions) {
    try {
      const chat = await msg.getChat()
        await chat.sendMessage(`Hello @${contact.id.user}`, {
          mentions: [contact],
        });
    } catch (error) {
		console.log(error);
	}
  }
});

client.initialize();
