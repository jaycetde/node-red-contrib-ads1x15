module.exports = function (RED) {
    "use strict";
    //  var ads1x15 = require("node-ads1x15");

    // The Output Node
    function ads1x15Node(n) {
        RED.nodes.createNode(this, n);

        var node = this;

        this.chip = n.chip || 0;
        this.address = n.address || 0x48;
        this.i2c_dev = n.i2c_dev || '/dev/i2c-1';

        this.channel = n.channel || 0;
        this.samplesPerSecond = n.samplesPerSecond || '250';
        this.progGainAmp = n.progGainAmp || '4096';

     //   var adc = new ads1x15(chip, address, i2c_dev);



        node.on("input", function (msg) {

            var reading = 0;
            // if (!adc.busy) {
            //     adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, function (err, data) {
            //         if (err) {
            //             throw err;
            //         }
            //         reading = data;
            //     });
            // }

            node.send({
                payload: JSON.stringify(this)
            });
        });

        node.on("close", function () {
            //   node.port.free();
        });
    }
    RED.nodes.registerType("ads1x15", ads1x15Node);
}