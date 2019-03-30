var keyVal = [];
var str = "abcdefghijklmnopqrstuvwxyz";
for(var i = 65; i <= 90;  i++){
    keyVal[i]  = str.charAt(i - 65);
}
// for(var i = 0; i <= 25; i ++){
//     keyVal[i] = str.charAt(i);
// }
console.log(keyVal);