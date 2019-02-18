serial.redirectToUSB()

function byte2hex_str(x: number) {
    let s = ''
    let digits = '0123456789abcdef'
	x &= 0xff
    s += digits.charAt( (x >> 4) & 0x0f )
    s += digits.charAt( x & 0x0f )
    return s
}

let i2c_addr = 0
let devices : number []

serial.writeLine( '\r\n\r\nScan I2C devices...' )

devices = PCF8574.scanDevices()
devices.forEach(function (addr, i) { 
    serial.writeLine( 'Found a device at 0x' + byte2hex_str(addr) )
    if ( (addr & ~0x07) == 0x20 || (addr & ~0x07) == 0x38) {
        i2c_addr = addr
    }
})

if (i2c_addr != 0) {
    serial.writeLine( 'set address of PCF8574(AT) to 0x' + byte2hex_str(i2c_addr) )
}

let dev = new PCF8574.Device()
dev.setAddress( i2c_addr )
serial.writeLine( 'current address 0x' + byte2hex_str( dev.getAddress()) )

let value = 0x01
basic.forever(function () { 
    if ( dev.writeByte( value ^ 0xff ) != 0 ) {
		serial.writeLine( 'I2C write failed' )
	}
    value = (value << 1) | ((value >> 7) & 1) // rotate shift left
    basic.pause(100)
})

//////////////////////////////////////////////////

