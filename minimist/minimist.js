import parseArgs from 'minimist';

const options = {
    alias: {
        p: 'puerto',
    },
    default: {
        puerto: 5000,
    }
}

const commandLineArgs = process.argv.slice(2);
const { puerto, _ } = parseArgs(commandLineArgs, options);

export { puerto };