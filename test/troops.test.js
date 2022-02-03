const { handler } = require("../src/troops.js");

describe("Test handler", () => {
    test("Should return an array of numbers", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                
                count: 3,
                total: 100,
            },
        };
        return handler(event).then((data) => {
            console.log(data);
            let nums = JSON.parse(data.body);
            expect(nums).toBeInstanceOf(Array);
        });
    });
    test("Should return an array of numbers with length of count", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: 3,
                total: 100,
            },
        };
        return handler(event).then((data) => {
            let nums = JSON.parse(data.body);
            expect(nums.length).toBe(3);
        });
    });
    test("Should be unique elements", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: 3,
                total: 100,
            },
        };
        return handler(event).then((data) => {
            let nums = JSON.parse(data.body);
            expect(new Set(nums).size).toBe(3);
        });
    });

    test("no element should be zero", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: 3,
                total: 100,
            },
        };
        return handler(event).then((data) => {
            let nums = JSON.parse(data.body);
            expect(nums.includes(0)).toBe(false);
        });
    });

    test("Random numbers generated should have a reasonable distribution", () => {
        const largestNum = {
            index0: 0,
            index1: 0,
            index2: 0
        };
        const smallestNum = {
            index0: 0,
            index1: 0,
            index2: 0
        };

        for (let i = 0; i < 1000; i++) {
            const event = {
                httpMethod: "GET",
                queryStringParameters: {
                    count: 3,
                    total: 100,
                },
            };
            return handler(event).then((data) => {
                let nums = JSON.parse(data.body);
                //get the index of the smallest number in nums
                const smallest = nums.reduce((acc, curr) => {
                    return curr < acc ? curr : acc;
                });
                smallestNum[nums.indexOf(smallest)]++;
                //get the index of the largest number in nums
                const largest = nums.reduce((acc, curr) => {
                    return curr > acc ? curr : acc;
                });
                largestNum[nums.indexOf(largest)]++;
            });
        }
        //check if the distribution among smallest numbers is reasonable
        expect(smallestNum[0] / smallestNum[1] / smallestNum[2]).toBeGreaterThan(0.5);
        expect(smallestNum[0] / smallestNum[1] / smallestNum[2]).toBeLessThan(1.5);
        //check if the distribution among largest numbers is reasonable
        expect(largestNum[0] / largestNum[1] / largestNum[2]).toBeGreaterThan(0.5);
        expect(largestNum[0] / largestNum[1] / largestNum[2]).toBeLessThan(1.5);

    });

    test("Should throw a 400 error if count is not a number", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: "a",
                total: 100,
            },
        };
        return handler(event).then((data) => {
            expect(data.statusCode).toBe(400);
        });
    });

    test("Should throw a 400 error if total is not a number", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: 3,
                total: "a",
            },
        };
        return handler(event).then((data) => {
            expect(data.statusCode).toBe(400);
        });
    });

    test("Should throw a 400 error if count is not given", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                total: 100,
            },
        };
        return handler(event).then((data) => {
            expect(data.statusCode).toBe(400);
        });
    });

    test("Should throw a 400 error if total is not given", () => {
        const event = {
            httpMethod: "GET",
            queryStringParameters: {
                count: 3,
            },
        };
        return handler(event).then((data) => {
            expect(data.statusCode).toBe(400);
        });
    });

    test("Should throw a 405 error if method is not GET", () => {
        const event = {
            httpMethod: "POST",
            queryStringParameters: {
                count: 3,
                total: 100,
            },
        };
        return handler(event).then((data) => {
            expect(data.statusCode).toBe(405);
        });
    });
});
