export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, hours: number[]): Result => {
    const average = hours.reduce((sum, cur) => sum + cur, 0) / hours.length;
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const success = average >= target;

    const diff = target - average;
    const rating = diff < 0.2 ? 3 : diff < 0.6 ? 2 : 1;

    const description = { 1: 'bad', 2: 'good', 3: 'great' };

    const ratingDescription = description[rating];

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments2 = (
    args: string[],
): { target: number; hours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments');

    return {
        target: Number(args[2]),
        hours: args.slice(3).map(a => {
            if (isNaN(Number(a))) throw new Error('Not number argument');
            return Number(a);
        }),
    };
};

if (require.main === module) {
    try {
        const { target, hours } = parseArguments2(process.argv);
        console.log(calculateExercises(target, hours));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}
