module.exports = function(args) {
    let sum  =0;

    for(let i=0; i<args.length; i++){
        sum += i;
    }

    return sum;
}