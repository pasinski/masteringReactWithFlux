# unwin

Transform windows absolute paths into UNIX paths.

[![NPM](https://nodei.co/npm/unwin.png)](https://nodei.co/npm/unwin/)

## Install

```sh
npm install --save unwin
```

## Examples

On Windows:

```
> require('os').platform()
'win32'
> unwin = require('unwin');
[Function: unwin]
> unwin('c:\\')
'/'
> unwin('\\top\\test\\file1.test.js')
'/top/test/file1.test.js'
```

On Linux:

```
> unwin = require('unwin');
[Function: unwin]
> unwin('c:\\')
'c:\\'
> unwin('\\top\\test\\file1.test.js')
'\\top\\test\\file1.test.js'
```
