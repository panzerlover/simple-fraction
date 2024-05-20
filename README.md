# Fr Class

The `Fr` class represents a fraction and provides various methods for performing arithmetic operations, conversions, and manipulations with fractions. Simpler than fraction.js as it contains no logic for radians or advanced parsing of strings.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Constructor](#constructor)
  - [Instance Properties](#instance-properties)
  - [Static Methods](#static-methods)
- [Examples](#examples)

## Installation

To use the `Fr` class in your project, you can include it directly or install it via npm if you package it.

```bash
npm install fraction-simple
```

Then, import the class in your JavaScript file:

```javascript
const { Fr } = require('fraction-simple');
```

## Usage

Create an instance of the `Fr` class by passing the numerator and denominator as arguments. If no arguments are provided, the default fraction is 0/1.

```javascript
const fraction = new Fr(3, 4);  // Represents the fraction 3/4
```

## API

### Constructor

```javascript
new Fr(numerator = 0, denominator = 1)
```

- `numerator` (number): The numerator of the fraction. Defaults to `0`. Stored as "n" internally
- `denominator` (number): The denominator of the fraction. Defaults to `1`. Stored as "d" internally 

### Instance Properties

- `numerator` (number): Returns the numerator.
- `denominator` (number): returns the denominator.
- `asFloat` (number): Returns the fraction as a floating-point number.
- `asInt` (number): Returns the integer part of the fraction (floor).
- `asIntCeil` (number): Returns the integer part of the fraction (ceil).
- `toString` (string): Returns the fraction as a string in the form "n/d".
- `toStringImproper` (string): Returns the reduced fraction as a string.
- `toStringProper` (string): Returns the fraction as a proper string.

### Static Methods

- `Fr.inv(fr)` (Fr): Returns the inverse of the fraction.
- `Fr.neg(fr)` (Fr): Returns the negation of the fraction.
- `Fr.cross(fr1, fr2)` (number): Returns the cross multiplication of two fractions.
- `Fr.add(fr1, fr2)` (Fr): Adds two fractions and returns the result.
- `Fr.sub(fr1, fr2)` (Fr): Subtracts the first fraction from the second and returns the result.
- `Fr.mul(fr1, fr2)` (Fr): Multiplies two fractions and returns the result.
- `Fr.div(fr1, fr2)` (Fr): Divides the first fraction by the second and returns the result.
- `Fr.gcd(a, b)` (number): Returns the greatest common divisor of two numbers.
- `Fr.red(fr)` (Fr): Returns the reduced form of the fraction.
- `Fr.uOne(fr)` (Fr): Returns the portion of the fraction that is under one.
- `Fr.fromString(str)` (Fr): Creates a fraction from a string representation.

## Examples

### Creating a Fraction

```javascript
const f1 = new Fr(3, 4);  // 3/4
console.log(f1.toString);  // "3/4"
```

### Arithmetic Operations

```javascript
const f1 = new Fr(1, 2);
const f2 = new Fr(1, 3);

const sum = Fr.add(f1, f2);
console.log(sum.toString);  // "5/6"

const diff = Fr.sub(f1, f2);
console.log(diff.toString);  // "1/6"

const product = Fr.mul(f1, f2);
console.log(product.toString);  // "1/6"

const quotient = Fr.div(f1, f2);
console.log(quotient.toString);  // "3/2"
```

### Conversions and Properties

```javascript
const f = new Fr(5, 2);

console.log(f.asFloat);  // 2.5
console.log(f.asInt);  // 2
console.log(f.asIntCeil);  // 3
console.log(f.toStringProper);  // "2 1/2"
console.log(f.toStringImproper);  // "5/2"
```

### Static Methods

```javascript
const f1 = new Fr(3, 4);

const inverse = Fr.inv(f1);
console.log(inverse.toString);  // "4/3"

const negated = Fr.neg(f1);
console.log(negated.toString);  // "-3/4"

const reduced = Fr.red(new Fr(6, 8));
console.log(reduced.toString);  // "3/4"

const fractionFromString = Fr.fromString("1.25");
console.log(fractionFromString.toString);  // "5/4"
```

This class provides a comprehensive set of tools for working with fractions, including arithmetic operations, conversions, and string representations.