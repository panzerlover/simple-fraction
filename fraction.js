class Fr{
    constructor(n = 0, d = 1) {
      this.n = n;
      this.d = d;
    }
    get #product(){
     return this.n / this.d;
    }
    get asFloat() {
      if (this.d === 0) return 0;
      return this.#product;
    }
    get asInt() {
      if (this.d === 0) return 0;
      return Math.floor(this.#product);
    }
    get asIntCeil() {
      if (this.d === 0) return 0;
      return Math.ceil(this.#product);
    }
    get toString(){
        return `${this.n}/${this.d}`;
    }
    get toStringImproper(){
        const reduced = Fr.red(this);
        return reduced.toString;
    }
    get toStringProper(){
        const reduced = Fr.red(this);
        if (reduced.d === 1) return String(reduced.n);
        if (reduced.n > reduced.d) {
            const underOne = Fr.uOne(reduced);
            const secondBit = underOne.n === 0 ? '' : underOne.toString;
            return `${reduced.asInt} ${secondBit}`
        } else {
            return reduced.toString
        }
    }
    static inv(fr){
    return new Fr(fr.d, fr.n)
    }
    static neg(fr){
        return new Fr(-fr.n, fr.d);
    }
    static cross(fr1, fr2){
        return fr1.n * fr2.d;
    }
    static add(fr1, fr2){
        return new Fr(
            Fr.cross(fr1, fr2) + Fr.cross(fr2, fr1),
            fr1.d * fr2.d
        )
      }
    static sub(fr1, fr2){
        return Fr.add(Fr.neg(fr1), fr2);
    }
    static mul(fr1, fr2){
        return new Fr(
            fr1.n * fr2.n,
            fr1.d * fr2.d
        )
      }
    static div(fr1, fr2){
        return Fr.mul(fr1, Fr.inverted(fr2))
    }
    static findGCD(a, b) {
        if (b === 0) {
          return a;
        } else {
          return Fr.findGCD(b, a % b);
        }
      }
    static red(fr){
        let d = (fr.n === 0) ? 1 : fr.d
        const gcd = Fr.findGCD(fr.n, d);
        return new Fr(
            fr.n / gcd,
            d / gcd,
        )
    }
    static uOne(fr) {
        return new Fr(fr.n % fr.d, fr.d)
    }
    static fromString(str){
        const split = str.split(".").map((s) => s.trim());
        if (split.length > 2) throw new Error(`invalid string passed to fromString: ${str}`)
        if (split.length === 1) return new Fr(parseInt[split[0]]);
        if (split[1].length === 0) return new Fr(parseInt[split[0]]);
        const d = "1" + "0".repeat(split[1].length);
        const frac = new Fr(parseInt(split[1]), parseInt(d));
        return Fr.add(new Fr(parseInt(split[0])), frac);
    }
}

exports.Fr = Fr;