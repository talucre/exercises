export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;

    if (bmi < 18.5) return 'Underweight';

    if (bmi < 25) return 'Normal range';

    return 'Overweight';
};

interface Params {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): Params => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('To many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return { height: Number(args[2]), weight: Number(args[3]) };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

if (require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Womething went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
