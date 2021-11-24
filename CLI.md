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
[mkvconf] v1.0.0 Help
help          : Display a list of available commands
lint file     : Check an input file for linting errors
     --fix    : Fix errors inline, replaces input file after read
     --suffix : Generate a new linted file, with the ".linted" suffix
```

### Lint

```
mkvconf lint test/fixtures/item.file
```

Returns:
```
Imperfections found in test/fixtures/item.file; (174 bytes, 15 lines) - can be fixed with the --fix flag
```

### Lint with --fix

```
mkvconf lint test/fixtures/item.file --fix
```

Returns:
```
Linted test/fixtures/item.file OK (174 bytes, 15 lines).
```

### Lint with --suffix

```
mkvconf lint test/fixtures/item.file --suffix
```

Returns:
```
Linted test/fixtures/item.file OK (174 bytes, 15 lines).
```


