
// Default array of primes
let arr = [29, 23, 19, 17, 13, 11, 7, 5, 3, 2];
const minLength = 1;
const maxLength = 100;


function inputSorting(req, res, next) {
    switch (req.query.input.toLowerCase()) {
        case !req.query.input:
            return 'invalid input'
        case 'quit':
            res.json({
                message: "success"
            })
            return
        case 'print':
            printCommand()
            res.json({
                message: "success"
            })

            return
        case 'sort':
            sortCommand()
            res.json({
                message: "success"
            })

            return
        case 'average':
            averageCommand()
            res.json({
                message: "success"
            })
            return

        case 'new':
            newCommand(req.query.length)
            res.json({
                message: "success"
            })
            return


        case 'gather':
            gatherCommand()
            res.json({
                message: "success"
            })
            break

        case 'biggies':
            biggestCommand()
            res.json({
                message: "success"
            })
            return


        case 'reverse':
            reverseCommand()
            res.json({
                message: "success"
            })
            return


        case 'push':
            pushCommand(req.query.push)
            res.json({
                message: "success"
            })
            return


        case 'pop':
            popCommand()
            res.json({
                message: "success"
            })
            return


        case 'extreme':
            extremesCommand()
            res.json({
                message: "success"
            })
            return


        case 'medianCommand':
            medianCommand()
            res.json({
                message: "success"
            })
            return

        default:
            res.json({
                message: "something not right"
            })
            return
    }

    res.json({
        message: "success"
    })
}

function printCommand() {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].toFixed(2) + " ");

        if ((i + 1) % 10 === 0) {
            console.log("\n");
        }
    }

    if (arr.length % 10 !== 0) {
        console.log("\n");
    }

    return
}

function sortCommand() {
    arr.sort((a, b) => a - b);
    console.log(arr);
    return
}

function averageCommand() {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const avg = sum / arr.length;

    console.log(avg)

    return

}

function newCommand(lengthTask) {
    const length = parseInt(lengthTask);

    if (isNaN(length) || length < minLength || length > maxLength) {
        console.log('Invalid length. Nothing was done.');
    } else {
        arr = new Array(length).fill(0).map(() => Math.random() * 1000);
        console.log('New array created:', arr);
    }

    return arr
}

function gatherCommand() {
    let evenArr = arr.filter(num => {
        let integerPart = parseInt(num);
        return integerPart % 2 === 0;
    });
    console.log(evenArr)
    return
}

function biggestCommand() {
    let max = Math.max(...arr);
    arr.fill(max);

    console.log(arr);

    return

}

function reverseCommand() {
    arr.reverse();
    console.log(arr);

    return
}

function pushCommand(push) {
    const newValue = parseFloat(push);

    if (!isNaN(newValue)) {
        arr.push(newValue);
    }

    console.log(arr)
    return
}

function popCommand() {
    if (arr.length === 0) {
        console.log("CA empty!");
    } else {
        const lastItem = arr.pop();
        console.log(`Removed item: ${lastItem}`);
    }

    return
}

function extremesCommand(arr) {
    if (arr.length === 0) {
        console.log("The array is empty.");
        return;
    }

    let min = arr[0];
    let minIndex = 0;
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
        if (arr[i] > max) {
            max = arr[i];
            maxIndex = i;
        }
    }

    console.log(`Arr[${minIndex}] = ${min} is the smallest element in the array.`);
    console.log(`Arr[${maxIndex}] = ${max} is the largest element in the array.`);
    return
}

function medianCommand() {
    const sortedArr = [...arr].sort((a, b) => a - b);

    const len = sortedArr.length;
    const median = len % 2 === 0 ? (sortedArr[len / 2 - 1] + sortedArr[len / 2]) / 2 : sortedArr[Math.floor(len / 2)];

    console.log("median of the array is:", median);
    return
}



module.exports = {
    inputSorting
}