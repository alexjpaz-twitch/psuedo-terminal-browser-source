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
    \rEinhänder
    `.trim(), 25);

    this.term.write("\n\r");
  }

  async start() {
    await this.loop();
  }

  async loop() {
    await this.printPrompt();

    await this.randomWait(500, 100)
    await this.runCatWallOfShame();

    
    return this.loop();
  }

  async slowWrite(text, delay = 0) {
    for await(const character of text) {
      await this.wait(delay);
      this.term.write(character);
    }
  }

  async humanizeWrite(text = "", min = 25, max = 100) {
    for await(const character of text) {
      if(!character === "\n") {
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
  