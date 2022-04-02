interface DigitRandomGenerator {
  generateDigit: () => number;
}

class MyDigitRandomGenerator implements DigitRandomGenerator {
  constructor(private sampleSize: number) {}
  generateDigit(): number {
    let randomNumber!: number;
    const data: { [key: number]: number } = {};
    const digits = Array.from(Array(10).keys());
    if (this.sampleSize < 20) {
      return this.getRandomInt(0, digits.length);
    }
    for (let i = 0; i < this.sampleSize; i++) {
      const random = this.getRandomInt(0, digits.length);
      const a = digits[random];
      //First occur
      if (typeof data[a] === "undefined") {
        data[a] = 1;
        //Check if the frequency of that digit is 10% then return
      } else if (Math.round((this.sampleSize * 10) / 100) === data[a] + 1) {
        randomNumber = a;
        data[a] = data[a] + 1;
        const index = digits.indexOf(a);
        if (index > -1) {
          digits.splice(index, 1);
        }
        break;
      } else {
        data[a] = data[a] + 1;
      }
    }

    return randomNumber;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const DigitRandomGen = new MyDigitRandomGenerator(100);
console.log(DigitRandomGen.generateDigit());
