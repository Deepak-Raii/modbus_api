
const fetchDevice = async (req, res) => {
  const tcpOptions = {
    host: '192.168.0.100',
    port: 100
  };

  await client.connectTCP(tcpOptions, async () => {
    console.log("TCP connection established...");
    await client.setID(170);
    await client.readHoldingRegisters(12343, 52).then(console.log);
  });

  client.on("error", (err) => {
    console.error("Connection error:", err.message);
  });
};