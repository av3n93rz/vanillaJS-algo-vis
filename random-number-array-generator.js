const randomNumberGenerator = () => Math.ceil((Math.random() * 100))

export const randomNumberArrayGenerator = () => new Array(15).fill(null).map(() => randomNumberGenerator())