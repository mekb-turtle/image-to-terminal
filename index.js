(async()=>{
const jimp = require("jimp");
const imagePath  = process.argv[2];
const image = await jimp.read(imagePath);
var x = process.stdout.columns;
var y = process.stdout.rows;
if (!x || !y) throw Error("terminal size is undefined");
x = x;
y = (y - 1) * 2;
if (x > y) image.resize(jimp.AUTO, y);
else if (x < y) image.resize(x, jimp.AUTO);
else image.resize(x, y);
image.scan(0,0,image.bitmap.width,image.bitmap.height,(x,y,idx)=>{
  const lerp = (n,m,t)=>(1-t)*n+t*m;
  var z = (x+y)%2?0x66:0x99;
  var _p = image.getPixelColor(x,y);
  var p = jimp.intToRGBA(_p);
  if (p.a <= 0) {
    image.setPixelColor(jimp.rgbaToInt(z,z,z,255),x,y);
  } else if (p.a < 255) {
    image.setPixelColor(jimp.rgbaToInt(
      lerp(z,p.r,p.a/255),
      lerp(z,p.g,p.a/255),
      lerp(z,p.b,p.a/255),
      255),x,y);
  }
});
var image2 = new jimp(x,y,0);
image2.blit(image, Math.floor(image2.bitmap.width/2-image.bitmap.width/2), Math.floor(image2.bitmap.height/2-image.bitmap.height/2));
delete image;
for (var i = 0; i < image2.bitmap.height / 2; ++i) {
  for (var j = 0; j < image2.bitmap.width; ++j) {
    const hex = Z => {
      var Y = jimp.intToRGBA(Z);
      return `${Y.r};${Y.g};${Y.b}`;
    };
    var p1 = image2.getPixelColor(j,i*2);
    var p2 = image2.getPixelColor(j,i*2+1);
    if (p1 == p2) {
      process.stdout.write(`\x1b[38;2;${hex(p2)};48;2;${hex(p2)}m█\x1b[0m`);
    } else {
      process.stdout.write(`\x1b[48;2;${hex(p1)};38;2;${hex(p2)}m▄\x1b[0m`);
    }
  }
}
process.stdout.write("\x1b[0m \x1b[1D");
})();
