const express = require("express");
const app = express();
const SerialPort = require('serialport');
const Modbus = require("modbus-serial");
const client = new Modbus();
const modbusModel = require("./model.js");
app.use(express.json())

app.post("/getData", async (req, res) => {
  const data = await req.body;
const {portName,startAddress,quantity,meterId} = data
  console.log("Data : ",data);


  try {
    // const portName = portName;
    const baudRate = 9600;
  
    await client.connectRTUBuffered(portName, { baudRate }, async () => {
      console.log("port connected...");
      await client.setID(meterId);
      const data = await client.readHoldingRegisters(startAddress, quantity);
      console.log("data : ",data.data);
      res.send(data);
    });
  
    client.on("error", (err) => {
      console.error("Connection error:", err.message);
    });

  } catch (error) {
    console.error('Error listing serial ports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});


/////////////////////////////////////////////////////////////////////////////////////






// try {
//   const ports = await SerialPort.list();

//   if (ports.length === 0) {
//     console.log('No serial ports found.');
//   } else {
//     console.log('Available serial ports:');
//     ports.forEach((port, index) => {
//       console.log(`${index + 1}. Path: ${port.path}`);
//       console.log(`   Manufacturer: ${port.manufacturer}`);
//       console.log(`   Vendor ID: ${port.vendorId}`);
//       console.log(`   Product ID: ${port.productId}`);
//       console.log('-------------------------');
//     });
//   }

//   res.json(ports);
// } catch (error) {
//   console.error('Error listing serial ports:', error);
//   res.status(500).json({ error: 'Internal server error' });
// }
// });