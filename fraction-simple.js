/**
 * Class representing a fraction.
 */
class Fr {
  /**
   * Creates a fraction.
   * @param {number} [numerator=0] - The numerator.
   * @param {number} [denominator=1] - The denominator.
   */
  constructor(numerator = 0, denominator = 1) {
      this.n = numerator;
      this.d = denominator;
  }
  /**
   * @readonly
   * @type {number}
   * @description Gets the numerator
   */
  get numerator(){
    return this.n
  }

  /**
   * @readonly
   * @type {number}
   * @description Gets the denominator
   */
  get denominator(){
    return this.d
  }

  /**
   * @private
   * @readonly
   * @type {number}
   * @description Gets the product of the numerator and denominator.
   */
  get #product() {
      return this.n / this.d;
  }

  /**
   * @readonly
   * @type {number}
   * @description Gets the fraction as a float.
   */
  get asFloat() {
      if (this.d === 0) return 0;
      return this.#product;
  }

  /**
   * @readonly
   * @type {number}
   * @description Gets the fraction as an integer (floored).
   */
  get asInt() {
      if (this.d === 0) return 0;
      return Math.floor(this.#product);
  }

  /**
   * @readonly
   * @type {number}
   * @description Gets the fraction as an integer (ceiled).
   */
  get asIntCeil() {
      if (this.d === 0) return 0;
      return Math.ceil(this.#product);
  }

  /**
   * @readonly
   * @type {string}
   * @description Gets the string representation of the fraction, without reduction
   */
  get toString() {
      return `${this.n}/${this.d}`;
  }

  /**
   * @readonly
   * @type {string}
   * @description Gets the string representation of the fraction in improper form, showing a reduced version of the fraction
   */
  get toStringImproper() {
      const reduced = Fr.red(this);
      return reduced.toString;
  }

  /**
   * @readonly
   * @type {string}
   * @description Gets the string representation of the fraction in proper form.
   */
  get toStringProper() {
      const reduced = Fr.red(this);
      if (reduced.d === 1) return String(reduced.n);
      if (reduced.n > reduced.d) {
          const underOne = Fr.uOne(reduced);
          const secondBit = underOne.n === 0 ? '' : underOne.toString;
          return `${reduced.asInt} ${secondBit}`;
      } else {
          return reduced.toString;
      }
  }
    /**
   * @readonly
   * @type {string}
   * @description Gets the string representation of the fraction in proper form, without reducing it
   */
    get toStringProperNoReduce() {
        if (this.d === 1) return String(this.n);
        if (this.n > this.d) {
            const underOne = Fr.uOne(this);
            const secondBit = underOne.n === 0 ? '' : underOne.toString;
            return `${this.asInt} ${secondBit}`;
        } else {
            return this.toString;
        }
    }

      /**
   * @readonly
   * @type {string}
   * @description Gets the string representation of the fraction in proper form, without reducing it
   */
      get toStringProperForceDenominator() {
        if (this.d === 1 && this.n !== 0) return `${this.n} 0/${this.d}`
        if (this.n > this.d) {
            return `${this.asInt} ${Fr.uOne(this).toString}`;
        } else {
            return this.toString;
        }
    }

  /**
   * Inverts the given fraction.
   * @param {Fr} fr - The fraction to invert.
   * @returns {Fr} The inverted fraction.
   */
  static inv(fr) {
      return new Fr(fr.d, fr.n);
  }

  /**
   * Negates the given fraction.
   * @param {Fr} fr - The fraction to negate.
   * @returns {Fr} The negated fraction.
   */
  static neg(fr) {
      return new Fr(-fr.n, fr.d);
  }

  /**
   * Computes the cross multiplication of two fractions.
   * @param {Fr} fr1 - The first fraction.
   * @param {Fr} fr2 - The second fraction.
   * @returns {number} The result of cross multiplication.
   */
  static cross(fr1, fr2) {
      return fr1.n * fr2.d;
  }

  /**
   * Adds two fractions.
   * @param {Fr} fr1 - The first fraction.
   * @param {Fr} fr2 - The second fraction.
   * @returns {Fr} The sum of the fractions.
   */
  static add(fr1, fr2) {
      return new Fr(
          Fr.cross(fr1, fr2) + Fr.cross(fr2, fr1),
          fr1.d * fr2.d
      );
  }

  /**
   * Subtracts the first fraction from the second fraction.
   * @param {Fr} fr1 - The first fraction.
   * @param {Fr} fr2 - The second fraction.
   * @returns {Fr} The difference of the fractions.
   */
  static sub(fr1, fr2) {
      return Fr.add(Fr.neg(fr1), fr2);
  }

  /**
   * Multiplies two fractions.
   * @param {Fr} fr1 - The first fraction.
   * @param {Fr} fr2 - The second fraction.
   * @returns {Fr} The product of the fractions.
   */
  static mul(fr1, fr2) {
      return new Fr(
          fr1.n * fr2.n,
          fr1.d * fr2.d
      );
  }

  /**
   * Divides the first fraction by the second fraction.
   * @param {Fr} fr1 - The first fraction.
   * @param {Fr} fr2 - The second fraction.
   * @returns {Fr} The quotient of the fractions.
   */
  static div(fr1, fr2) {
      return Fr.mul(fr1, Fr.inv(fr2));
  }

  /**
   * Finds the greatest common divisor (GCD) of two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The GCD of the two numbers.
   */
  static gcd(a, b) {
      if (b === 0) {
          return a;
      } else {
          return Fr.gcd(b, a % b);
      }
  }

  /**
   * Reduces the given fraction.
   * @param {Fr} fr - The fraction to reduce.
   * @returns {Fr} The reduced fraction.
   */
  static red(fr) {
      let d = (fr.n === 0) ? 1 : fr.d;
      const gcd = Fr.gcd(fr.n, d);
      return new Fr(
          fr.n / gcd,
          d / gcd
      );
  }

  /**
   * Returns the portion of the fraction that is less than one, if application
   * @param {Fr} fr - The fraction to evaluate.
   * @returns {Fr} The portion of the fraction less than one.
   */
  static uOne(fr) {
      return new Fr(fr.n % fr.d, fr.d);
  }

  /**
   * Creates a fraction from a string representation.
   * @param {string} str - The string representation of the fraction.
   * @returns {Fr} The fraction created from the string.
   * @throws {Error} If the string is invalid.
   */
  static fromString(str) {
      const split = str.split(".").map((s) => s.trim());
      if (split.length > 2) throw new Error(`invalid string passed to fromString: ${str}`);
      if (split.length === 1) return new Fr(parseInt(split[0]));
      if (split[1].length === 0) return new Fr(parseInt(split[0]));
      const d = "1" + "0".repeat(split[1].length);
      const frac = new Fr(parseInt(split[1]), parseInt(d));
      return Fr.add(new Fr(parseInt(split[0])), frac);
  }
}

exports.Fr = Fr;