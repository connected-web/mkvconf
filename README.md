# mkvconf

A custom configuration file format that maps to JSON; a more forgiving and less boiler plate way of writing data for systems.

This implementation of `mkvconf` is written in javascript, and uses `nodejs` and `npm`.

The format allows for groups of objects to be quickly copy and pasted, with a forgiving minimalist format for building lists of objects with complex properties quickly.

```
// mkvconf.file
[Star]
name Sol
equatorial.radius.min     695,700 km
equatorial.radius.max     696,342 km
equatorial.circumference  4.379×106 km
flattening                9×10−6
surface.area              6.09×1012 km²
volume	                  1.41×1018 km³
mass                      1.9885×1030 kg
composition.Hydrogen      73.46%
composition.Helium        24.85%
composition.Oxygen        0.77%
composition.Carbon        0.29%
composition.Iron          0.16%
composition.Neon          0.12%
composition.Nitrogen      0.09%
composition.Silicon       0.07%
composition.Magnesium     0.05%
composition.Sulphur	      0.04%

[Planet]
name            Earth
distance.to.sun 149.6 million km
planet.radius   6,371 km
surface.area    510.1 million km²
land.area       148.9 million km²
mass            5.972 × 10^24 kg

[Planet]
name            Mercury
distance.to.sun 57.91 million km
orbital.period  88 days
planet.radius   2,439.7 km
surface.area    74.8 million km²
length.of.day   58d 15h 30m
mass            3.285 × 10^23 kg
density         5.43 g/cm³
```

## Command line tool

If this file format is interesting to you; you may want to read about the [mkvconf command line tool](./CLI.md).

## Development Usage

Install the local package:

```
npm install mkvconf
```

### Deserialising data (parse)

To load and parse data:

```js
const mkvconf = require('mkvconf')
const fs = require('fs')

const body = fs.readFileSync('item.file', 'utf8')
const data = mkconf.parse(body)
console.log(data)
```

### Serializing data (format)

To produce a `mkvconf` file from data:

```js
const mkvconf = require('mkvconf')
const data = {
  Fruits: [{
    name: 'Apple',
    cost: '£0.34/kg'
  }, {
    name: 'Orange'
    cost: '£0.42/kg'
  }, {
    name: 'Banana',
    cost: '$0.65/kg'
  }]
}
const text = mkvconf.format(data)
console.log(text)
```

## Item example

```file
// item.file
[Item]
id             item-1
meta.name      Item One
position.x     124
position.y     523    

[Item]
id             item-2
meta.name      Item Two
position.x     224
position.y     323  
```

Parses to:

```json
{
  "Item": [{
    "id": "item-1",
    "meta": {
      "name": "Item One"
    },
    "position": {
      "x": 124,
      "y": 523
    }
  }, {
    "id": "item-2",
    "meta": {
      "name": "Item Two"
    },
    "position": {
      "x": 224,
      "y": 323
    }
  }],
  "comments": [
    "// item.file"
  ]
}
```

## Fruit example

```
// fruit.file
[Fruit]
name Banana
skin yellow
flesh beige
icon assets/banana.png

[Fruit]
name Apple
skin green
flesh white
icon assets/apple.png
```

Parses to:

```json
{
  "Fruit": [{
    "name": "Banana",
    "skin": "yellow",
    "flesh": "beige",
    "icon": "assets/banana.png"
  }, {
    "name": "Apple",
    "skin": "green",
    "flesh": "white",
    "icon": "assets/apple.png"
  }],
  "comments": [
    "// fruit.file"
  ]
}
```

## Parsing rules

The parsing rules are designed to be very simple.

### Line breaks

Lines are parsed using the `\n` line break. 

### Tabs and other spacing

All lines are trimmed before matching; so extra spaces at the start or ends are ignored.

### Comments

Any line beginning with `//` is considered a comment, and is collected into an array property `comments` in the result.

### Object Group

Any line beginning with `[` and ending with `]` starts a new object group, with the group name based on the internals. Valid characters for the group name are Alpha-numeric with spaces and dashes matching the regex: `/[([A-z\d- ]+)]/`; the object group name will be trimmed of any additional spacing.

### Key Value Pairs

Once the first object group has been created; any line that matches the regex `/^([A-z][A-z\d.]*)\s+(.*)/` will be considered a key value pair, and added to the last object group. Values are trimmed and parsed. Multi-line values are not supported. Additional spaces between the `key` and the `value` will be ignored.

To ensure numbers are parsed as numbers, and booleans as booleans, values are passed through `JSON.parse()` - so you could get fancy and embed arrays, or more complex objects, provided they fit on one line.

### Blank lines

Empty lines are ignored; i.e. anything line that when trimmed has a length of `0`.

### Unmatched lines

Lines that do not match a supported regex will be stored in order with the comments. Maybe you can abuse this to store extra data, but your mileage may vary.

## Wishlist

- Command line wrapper
- `npx` instructions
- Linter - parse, validate, format, write
