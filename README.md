### show-image-terminal
Show an image in the terminal

Example:

![image](https://i.imgur.com/RR2AYsX.png)

You can also use this as a module, args as follows:

- data  - can be a buffer, path, url, or whatever [Jimp.read](https://www.npmjs.com/package/jimp#user-content-basic-usage) can take
- width - width shown, will default to terminal width if not provided
- height - height shown, will default to terminal width if not provided
- new line - if truthy, will not put `\n`s in result
