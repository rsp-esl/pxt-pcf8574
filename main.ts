///////////////////////////////////////////////////////////////////////////////

enum PCF8574Address {
	// 7-bit I2C addresses for PCF8574
	//% block="0x20"
    PCF8574_ADDR_0x20 = 0x20,
	//% block="0x21"
    PCF8574_ADDR_0x21 = 0x21,
	//% block="0x22"
    PCF8574_ADDR_0x22 = 0x22,
	//% block="0x23"
    PCF8574_ADDR_0x23 = 0x23,
	//% block="0x24"
    PCF8574_ADDR_0x24 = 0x24,
	//% block="0x25"
    PCF8574_ADDR_0x25 = 0x25,
	//% block="0x26"
    PCF8574_ADDR_0x26 = 0x26,
	//% block="0x27"
    PCF8574_ADDR_0x27 = 0x27,
	
	// 7-bit I2C addresses for PCF8574AT
	//% block="0x38"
    PCF8574AT_ADDR_0x38 = 0x38,
	//% block="0x39"
    PCF8574AT_ADDR_0x39 = 0x39,
	//% block="0x3a"
    PCF8574AT_ADDR_0x3a = 0x3a,
	//% block="0x3b"
    PCF8574AT_ADDR_0x3b = 0x3b,
	//% block="0x3c"
    PCF8574AT_ADDR_0x3c = 0x3c,
	//% block="0x3d"
    PCF8574AT_ADDR_0x3d = 0x3d,
	//% block="0x3e"
    PCF8574AT_ADDR_0x3e = 0x3e,
	//% block="0x3f"
    PCF8574AT_ADDR_0x3f = 0x3f
}

/*
 * PCF8574 functions
 */

//% color="#2c4e20" weight=100  

//% color="#2c4e20" weight=100  
namespace PCF8574 {

	export class Device {
		i2c_addr: number 
		buf: Buffer

		/**
		* set the address of the device 
		* @param addr the new address of this device 
		*/		
		//% blockId="pcf8574 set address" block="device|addr"
		//% weight=85 blockGap=8
		public setAddress( addr : number ) : void {
			this.i2c_addr = addr 		
		}
	
		/**
		* get the address of the device
		*/		
		//% blockId="pcf8574 get address" block="get address"
		//% weight=85 blockGap=8
		public getAddress() : number { 
			return this.i2c_addr
		}
	
		/**
		* write a data byte to the device
		* @param data the data byte to be sent to the device
		*/		
		//% blockId="pcf8574 write byte" block="write a data byte %data"
		//% weight=85 blockGap=8
		public writeByte( data : number ) : number {
			if ( this.buf == null ) {
				this.buf = pins.createBuffer(1)
			}
			this.buf.setNumber( NumberFormat.UInt8LE, 0, (data & 0xff) ) 
			let result = pins.i2cWriteBuffer( this.i2c_addr, this.buf )
			return result
		}
	
		/**
		* read a data byte from the device
		*/		
		//% blockId="pcf8574 read byte" block="read a data byte"
		//% weight=85 blockGap=8
		public readByte() : number {
			let rbuf = pins.i2cReadBuffer(this.i2c_addr, 1)
			if ( rbuf.length == 1 ) {
				return rbuf.getNumber(NumberFormat.UInt8LE, 0)	
			} else { 
				return null
			}
		}	
	}
	
    /**
     * scan I2C devices and return an array of found I2C addresses.
     */
    //% blockId="PCF8574_SCAN_DEVICES" block="pcf8574 scan devices"
    //% weight=100 blockGap=8
    export function scanDevices() : number[] {
		let buf = pins.createBuffer(1)
        buf.setNumber(NumberFormat.UInt8LE, 0xff, 0)
        let found_devices : number[] = []
        for (let addr = 1; addr <= 0x7f; addr++) {
            let result = pins.i2cWriteBuffer( addr, buf )
            if (result == 0) {
                found_devices.push( addr )
            }
        }
        return found_devices
    }	

    /**
     * create a new PCF8574 device
     */
    //% blockId="PCF8574_CREATE_DEVICE" block="pcf8574 create a device"
    //% weight=100 blockGap=8
	export function create( addr : PCF8574Address = PCF8574Address.PCF8574_ADDR_0x20 ) : Device { 
		let device = new Device()
		device.buf = null
		device.i2c_addr = addr
		return device
	}
	
} 
///////////////////////////////////////////////////////////////////////////////
