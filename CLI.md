# mkvconf cli

To help make the `mkvconf` file format more accessible; the library comes with a command line tool which provides linting and conversion from `mkvconf` format to `json` and back.

## Run using npx

If you have `node` and `npm` installed, you can run the tool directly without installation, e.g.:

```
npx -y mkvconf help
```

## Install locally

```
npm install -g mkvconf
mkvconf
```

## Commands

### Help

```
mkvconf help
```

Returns:
```
[mkvconf] v1.2.0 Help
help          : Display a list of available commands
lint file     : Check an input file for linting errors
     --fix    : Fix errors inline, replaces input file after read
     --suffix : Generate a new linted file, with the ".linted" suffix
json file     : Convert the input file into json with a .json suffix
```

### Lint

```
mkvconf lint test/fixtures/item.file
```

Returns:
```
Imperfections found in test/fixtures/item.file; (174 bytes, 15 lines) - can be fixed with the --fix flag
```

You should also be able to use glob patterns to lint multiple files, e.g.:

```
mkvconf lint **/*.file
```

Returns:

```
Imperfections found in test/fixtures/item.file; (174 bytes, 15 lines) - can be fixed with the --fix flag
Imperfections found in test/fixtures/mixed.file; (1126 bytes, 51 lines) - can be fixed with the --fix flag
Imperfections found in test/fixtures/unicode.file; (480 bytes, 15 lines) - can be fixed with the --fix flag
```

### Lint with --fix

```
mkvconf lint test/fixtures/item.file --fix
```

Returns:
```
Linted test/fixtures/item.file OK (174 bytes, 15 lines).
```

### Lint with --suffix

```
mkvconf lint test/fixtures/item.file --suffix
```

Returns:
```
Linted test/fixtures/item.file OK (174 bytes, 15 lines).
```

### Convert file to JSON

```
mkvconf json test/fixtures/item.file
```

Returns:
```
Source test/fixtures/item.file saved as test/fixtures/item.file.json OK (358 bytes, 27 lines).
```

And creates `item.file.json`:
```json
{
  "Item": [
    {
      "id": "item-1",
      "meta": {
        "name": "Item One"
      },
      "position": {
        "x": 124,
        "y": 523
      }
    },
    {
      "id": "item-2",
      "meta": {
        "name": "Item Two"
      },
      "position": {
        "x": 224,
        "y": 323
      }
    }
  ],
  "comments": [
    "// item.file"
  ]
}
```
