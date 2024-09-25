function delay(ms) {
    // const start = Date.now();
    // // Loop until 100ms has passed
    // while (Date.now() - start < ms) {
    //     console.log(`Delaying for ${ms} ms`);
    //     // Do nothing, just keep looping
    // }
    for (let index = 0; index < ms*100; index++) {
        console.log("Delaying for 1 ms");
        
    }
    console.log(`Finished ${ms} ms delay`);
}

