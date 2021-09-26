### image-to-terminal
Show an image in the terminal

Example:

![image](https://cdn.discordapp.com/attachments/844837416841117707/885475089376747560/unknown.png)

You can also use this as a module, args as follows:

- data  - can be a buffer, path, url, or whatever [Jimp.read](https://www.npmjs.com/package/jimp#user-content-basic-usage) can take
- width - width shown, will default to terminal width if not provided
- height - height shown, will default to terminal width if not provided
- new line - if truthy, will not put `\n`s in result
