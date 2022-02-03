const {
    getRandomInt,
    checkForZeroes,
    checkTotal,
    randomNumber,
} = require("../src/util.js");

describe("Test getRandomInt", () => {
    test("should return a number between 0 and 100", () => {
        const num = getRandomInt(0, 100, 100);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(100);
    });
    test("Should return an integer", () => {
        const num = getRandomInt(0, 100, 100);
        expect(num).toBe(Math.round(num));
    });
});

describe("Test checkForZeroes", () => {
    test("Should ensure no elements are zero", () => {
        const nums = [0, 0, 0, 0, 0];
        checkForZeroes(nums);
        expect(nums).not.toEqual([0, 0, 0, 0, 0]);
    });
});

describe("Test CheckTotal", () => {
    test("Should return a number that is not greater than the total", () => {
        const nums = [100, 100, 100, 100, 100];
        const total = 100;
        checkTotal(nums, total);
        const calcTotal = nums.reduce((a, b) => a + b);
        expect(calcTotal).toEqual(total);
    });
    test("Should return a number that is not less than the total", () => {
        const nums = [0, 0, 0, 0, 0];
        const total = 100;
        checkTotal(nums, total);
        const calcTotal = nums.reduce((a, b) => a + b);
        expect(calcTotal).toEqual(total);
    });
});

describe("Test randomNumber", () => {
    test("Should return an array of numbers", () => {
        const nums = randomNumber(1, 100);
        expect(nums).toBeInstanceOf(Array);
    });
    test("Each element should be greater than 0", () => {
        const nums = randomNumber(1, 100);
        nums.forEach((num) => {
            expect(num).toBeGreaterThan(0);
        });
    });
    test("The result of the function should be different with each call", () => {
        const results = [];

        for (let index = 0; index < 100; index++) {
            results.push(randomNumber(1, 100));
        }
        // check that none of the arrays in results are equal
        const uniqueResults = results.filter((result, index) => {
            return results.indexOf(result) === index;
        });
        expect(results.length).toEqual(uniqueResults.length);
    });
    test("Count larger than total should throw error", () => {
        expect(() => {
            randomNumber(101, 100);
        }).toThrow();
    });

    test("Count less than 0 should throw error", () => {
        expect(() => {
            randomNumber(-1, 100);
        }).toThrow();
    });

    test("Total less than 0 should throw error", () => {
        expect(() => {
            randomNumber(1, -100);
        }).toThrow();
    });

    test("Count and total of 0 should return an empty array", () => {
        const nums = randomNumber(0, 0);
        expect(nums).toEqual([]);
    });
});
