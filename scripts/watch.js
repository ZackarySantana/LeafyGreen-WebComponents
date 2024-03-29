import fs from "fs";
import { exec } from "child_process";

let timeout;
const debounceDelay = 100;

const srcDir = "./src";

console.log(`Watching for file changes on ${srcDir}`);

fs.watch(srcDir, { recursive: false }, (eventType, filename) => {
    if (timeout) {
        return;
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log(
            `Detected ${eventType} in ${filename}, running build for ${filename}...`
        );
        exec(
            `cross-env BUNDLE=${filename.replace("src/", "")} npm run build`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(stdout);
                if (stderr) {
                    console.log(`ERROR: ${stderr}`);
                }
            }
        );
        timeout = null;
    }, debounceDelay);
});
