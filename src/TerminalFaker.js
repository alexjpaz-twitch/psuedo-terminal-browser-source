const qrcode = require("qrcode-terminal");

class TerminalFaker {

  constructor(term) {
    this.term = term;
  }

  async printPrompt() {
    this.term.write("$ ");
  }

  async runCatWallOfShame() {
    await this.humanizeWrite("cat /home/alexjpaz/wall_of_shame.txt \n\r");
    await this.wait(300);

    await this.slowWrite(`
    \rdark souls 1
    \rholy diver
    \reinhänder
    `.trim(), 25);

    this.term.write("\n\r");
  }

  async runShowYams() {
    await this.humanizeWrite("xopen /home/alexjpaz/pictures/yams.png \n\r");
    await this.wait(50);


    await this.slowWrite(`cannot access '/home/alexjpaz/pictures/yams.png': No such file or directory\n\r`, 5);
  }

  async runQRCode(filename = "home/alexjpaz/documents/jumbler.txt", text = "fuck you jumbler") {
    await this.humanizeWrite(`qrcode < ${filename}\r\n`);
    await this.wait(250);

    await new Promise((r) => {
      qrcode.generate(text, {small: true}, (qrcode) => {
        this.term.write(qrcode.replace(/\n/g,'\r\n'));
        r();
      });
    })
  }

  async runCatFacts() {
    await this.humanizeWrite(`curl -X 'GET' -H 'accept: application/json' 'https://catfact.ninja/fact'\r\n`);
    
    const json = await fetch("https://catfact.ninja/fact").then(r => r.json());
    const text = JSON.stringify(json, null, 2); 

    await this.slowWrite(text+"\r\n", 5);
  }

  async start() {
    await this.loop();
  }

  async loop() {
    await this.printPrompt();

    await this.randomWait(3000, 100)

    await this.randomCommand();


    
    return this.loop();
  }

  async randomCommand() {

    const commands = [
      this.runCatWallOfShame,
      this.runShowYams,
      () => this.runQRCode("/home/alexjpaz/jumbler.txt", "fuck you jumbler"),
      () => this.runQRCode("/home/alexjpaz/discord.txt", "https://discord.gg/M9p7Q4A"),
      this.runCatFacts,
    ];

    try {
      const command = commands[Math.floor(Math.random()*commands.length)];

      await command.call(this);
    } catch(e) {
      this.term.writeln("\n\rcommand exited with non-zero status " +e.message);
    }
  }

  async slowWrite(text, delay = 0) {
    text = text.replace(/\n/g,'\r\n')
    for await(const character of text) {
      await this.wait(delay);
      this.term.write(character);
    }
  }

  async humanizeWrite(text = "", min = 25, max = 100) {
    for await(const character of text) {
      if(character !== "\n") {
        await this.randomWait(min, max)
      }
      this.term.write(character);
    }
  }

  async wait(timeout = 3000) {
    await new Promise(r => setTimeout(r, timeout));
  }

  async randomWait(min, max) {
    const randomTimeout = Math.floor(Math.random() * (max - min + 1) + min);
    await this.wait(randomTimeout);
  }

  async stop() {

  }
  
}
  export default TerminalFaker;
  