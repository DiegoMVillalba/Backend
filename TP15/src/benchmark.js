import autocannon from 'autocannon';
import { passThrough } from 'stream';

function run(url){
    const buffer = [];
    const output = new passThrough();

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    });

    autocannon.track(inst, {output: output});
    output.on('data', data => {
        buffer.push(data);
    });

    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buffer));
    })
}

console.log('Running tests')
run('http://localhost:3030/test/info');
