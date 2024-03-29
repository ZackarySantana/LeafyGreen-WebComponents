// const fs = require("fs");
// const path = require("path");
// const { rollup } = require("rollup");
// const resolve = require("@rollup/plugin-node-resolve").default;
// const commonjs = require("@rollup/plugin-commonjs");

// convert to import statements
import fs from "fs";
import path from "path";
import { rollup } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const inputDir = "./src";
const outputDir = "./dist";

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

let specificFileToBundle = process.env.BUNDLE;
let files;
if (specificFileToBundle) {
    if (!specificFileToBundle.endsWith(".js")) {
        specificFileToBundle += ".js";
    }
    if (fs.existsSync(path.join(inputDir, specificFileToBundle))) {
        files = [specificFileToBundle];
    } else {
        console.error(
            `The specified file does not exist: ${specificFileToBundle}`
        );
        process.exit(1);
    }
} else {
    files = fs
        .readdirSync(inputDir)
        .filter((file) => path.extname(file) === ".js");
}

// Configurable concurrency limit
const CONCURRENCY_LIMIT = 5;
let activePromises = [];

async function bundleFile(file) {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file);
    const bundle = await rollup({
        input: inputFilePath,
        plugins: [resolve(), commonjs()],
    });
    await bundle.write({
        file: outputFilePath,
        format: "iife",
    });
    console.log(`Bundled: ${file}`);
}

async function limitConcurrency(taskList, limit) {
    const results = [];
    for (const task of taskList) {
        const promise = task();
        results.push(promise);
        // Only when active promises reach the limit, wait for one to finish
        if (activePromises.push(promise) >= limit) {
            await Promise.race(activePromises).then(() => {
                // Remove settled promise from the list
                activePromises = activePromises.filter((p) => p !== promise);
            });
        }
    }
    return Promise.all(results);
}

(async () => {
    try {
        await limitConcurrency(
            files.map((file) => () => bundleFile(file)),
            CONCURRENCY_LIMIT
        );
        console.log("All files have been bundled successfully.");
    } catch (error) {
        console.error(`Error during bundling: ${error}`);
    }
})();
