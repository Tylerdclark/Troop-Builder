
/**
 * Will generate a random number array of length n, which will add up to total
 * 
 * @param {*} count the count of numbers to generate
 * @param {*} total the total of the numbers
 * @returns an array of random numbers
 */

const randomNumber = (count, total) => {
    let nums = [];
    for (let i = 0; i < count; i++) { //first populate arr with rand btwn 0 and 1
        nums.push(Math.random());
    }
    const workingSum = nums.reduce((a, b) => a + b)

    for (let i = 0; i < count; i++) {
        nums[i] = getRandomInt(nums[i], workingSum, total);
    }
    checkForZeroes(nums);
    checkTotal(nums, total);

    return nums;
}   

/**
 * Will convert a random float to an integer, scaled by the total
 * 
 * @param {*} num random number to be scaled
 * @param {*} sum the sum of all the random numbers btwn 0 and 1
 * @param {*} total desired total
 * @returns the scaled number
 */
const getRandomInt = (num, sum, total) => {
    num = num/sum
    return Math.round(num * total)
}

/**
 * Will check if any of the numbers are 0. If so, it will increment the largest number and call this function again.
 * 
 * @param {*} nums array of numbers
 * @returns nothing if no zeroes are found, else it will call itself again
 */
const checkForZeroes = (nums) => {
    if (nums.includes(0)) {
        nums[nums.indexOf(0)]++;
        return checkForZeroes(nums);
    }
}

/**
 * Will check if the sum of the numbers is equal to the total
 * 
 * @param {*} nums array of numbers
 * @param {*} total desired total
 * @returns nothing if the sum is equal to the total, else it will call itself again
 */
const checkTotal = (nums, total) => {
    const runningTotal = nums.reduce((a, b) => a + b);
    if (runningTotal > total) {
        nums[nums.indexOf(Math.max(...nums))]--;
        return checkTotal(nums, total);
    }
    if(runningTotal < total) {
        nums[nums.indexOf(Math.min(...nums))]++;
        return checkTotal(nums, total);
    }
}


exports.randomNumber = randomNumber;
exports.getRandomInt = getRandomInt;
exports.checkForZeroes = checkForZeroes;
exports.checkTotal = checkTotal;