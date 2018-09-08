module.exports = function(RED) {
  "use strict";
  var ads1x15 = require("node-ads1x15");

  // The Output Node
  function ads1x15Node(n) {
    RED.nodes.createNode(this, n);

    var node = this;

    this.chip = n.chip || 0;
    this.address = parseInt(n.address) || 0x48;
    this.i2c_dev = n.i2c_dev || "/dev/i2c-1";

    this.channel = n.channel || 0;
    this.samplesPerSecond = n.samplesPerSecond || "250";
    this.progGainAmp = n.progGainAmp || "4096";

    this.adc = new ads1x15(this.chip, this.address, this.i2c_dev);

    node.on("input", function(msg) {
      //Don't try to read if it says the chip is currently busy
      if (!node.adc.busy) {
        node.adc.readADCSingleEnded(
          node.channel,
          node.progGainAmp,
          node.samplesPerSecond,
          function(err, data) {
            if (err) {
              node.status({ fill: "red", shape: "dot", text: "Error" });
              node.send({ error: err });
            } else {
              node.status({ fill: "green", shape: "dot", text: "Read" });
              node.send({
                payload: data
              });
            }
          }
        );
      } else {
        node.status({ fill: "yellow", shape: "dot", text: "Waiting" });
      }
    });

    node.on("close", function() {
      //   node.port.free();
    });
  }
  RED.nodes.registerType("ads1x15", ads1x15Node);
};
