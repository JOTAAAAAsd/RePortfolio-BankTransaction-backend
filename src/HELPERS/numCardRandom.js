
/*
 16 dígitos agrupadas de 4 en 4

*/


function numcardRandom() {

    var random_num_arr = [];

    for (let i = 0; i <= 15; i++) {
        var random_num = Math.floor(Math.random() * 9);

        random_num_arr.push(random_num);

    }

    // console.log(random_num_arr);
    // console.log(random_num_arr.length); // 16

    var arr1 = random_num_arr.slice(0, 4).toString().replace(/,/g, "");
    var arr2 = random_num_arr.slice(4, 8).toString().replace(/,/g, "");
    var arr3 = random_num_arr.slice(8, 12).toString().replace(/,/g, "");
    var arr4 = random_num_arr.slice(12, 16).toString().replace(/,/g, "");

    // console.log(arr1 + "-" + arr2 + "-" + arr3 + "-" + arr4);

    return arr1 + "-" + arr2 + "-" + arr3 + "-" + arr4;


}


module.exports = {
    numcardRandom
}














