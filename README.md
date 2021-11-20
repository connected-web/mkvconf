# mkvconf

A custom configuration file format that maps to JSON; a more forgiving and less boiler plate way of writing data for systems.

This implementation of `mkvconf` is written in javascript, and uses `nodejs` and `npm`.

## Development Usage

Install the local package:

```
npm install mkvconf
```

In a javascript project:

```js
import mkvconf from 'mkvconf'
import fs from 'fs'

const body = fs.readFileSync('item.file', 'utf8')
const data = mkconf.parse(body)
console.log(data)
```

## Item example

```file
// item.file
[Item]
id             item-1
property.name  Item One
position.x     124
position.y     523    

[Item]
id             item-2
property.name  Item Two
position.x     224
position.y     323      
```

Parses to:

```json
{
  "Item": [{
    "id": "item-1",
    "property": {
      "name": "Item One",
      "position": {
        "x": 124,
        "y": 523
      }
    }
  }, {
    "id": "item-2",
    "property": {
      "name": "Item Two",
      "position": {
        "x": 224,
        "y": 323
      }
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

### Blank lines

Empty lines are ignored; i.e. anything line that when trimmed has a length of `0`.

### Unmatched lines

Lines that do not match a supported regex will be stored in order with the comments. Maybe you can abuse this to store extra data, but your mileage may vary.

## Wishlist

- Command line wrapper
- `npx` instructions
- Linter - parse, validate, format, write
