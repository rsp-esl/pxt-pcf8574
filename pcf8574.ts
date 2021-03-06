///////////////////////////////////////////////////////////////////////////////

/*
 * PCF8574 functions
 */

//% color="#2c4e20" weight=100  
namespace PCF8574 {
	
	// List of PCF8574(AT) addresses
	export enum Address {
		// 7-bit I2C addresses for PCF8574
		//% block="0x20"
		ADDR_0x20 = 0x20,
		//% block="0x21"
		ADDR_0x21 = 0x21,
		//% block="0x22"
		ADDR_0x22 = 0x22,
		//% block="0x23"
		ADDR_0x23 = 0x23,
		//% block="0x24"
		ADDR_0x24 = 0x24,
		//% block="0x25"
		ADDR_0x25 = 0x25,
		//% block="0x26"
		ADDR_0x26 = 0x26,
		//% block="0x27"
		ADDR_0x27 = 0x27,
		// 7-bit I2C addresses for PCF8574AT
		//% block="0x38"
		ADDR_0x38 = 0x38,
		//% block="0x39"
		ADDR_0x39 = 0x39,
		//% block="0x3a"
		ADDR_0x3a = 0x3a,
		//% block="0x3b"
		ADDR_0x3b = 0x3b,
		//% block="0x3c"
		ADDR_0x3c = 0x3c,
		//% block="0x3d"
		ADDR_0x3d = 0x3d,
		//% block="0x3e"
		ADDR_0x3e = 0x3e,
		//% block="0x3f"
		ADDR_0x3f = 0x3f
	}

    /**
	* A PCF8574 Device
	*/
    export class Device {
        i2c_addr: number 
        buf: Buffer

        /**
        * Set the address of the device 
        * @param addr the new address of this device 
        */        
        //% blockId="device_set_address" block="%device|set the device address %addr"
        //% weight=40 blockGap=8
        //% parts="PCF8574"
        public setAddress( addr : number ) : void {
            this.i2c_addr = addr         
        }
    
        /**
        * Get the address of the device
        */        
        //% blockId="device_get_address" block="%device|get the device address"
        //% weight=10 blockGap=8
        //% parts="PCF8574"
        public getAddress() : number { 
            return this.i2c_addr
        }
    
        /**
        * Write a data byte to the device
        * @param data the data byte to be sent to the device
        */        
        //% blockId="device_write_byte" block="%device|write a data byte %data to the device"
        //% weight=20 blockGap=8
        //% parts="PCF8574"
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
        //% blockId="device_read_byte" block="%device|read a data byte from the device"
        //% weight=30 blockGap=8
        //% parts="PCF8574"
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
     * Scan I2C devices and return an array of found I2C addresses.
     */
    //% blockId="PCF8574_SCAN_DEVICES" block="PCF8574 scan devices"
    //% weight=100 blockGap=8
    //% parts="PCF8574"
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
     * Create a new PCF8574 device
     */
    //% blockId="PCF8574_CREATE_DEVICE" block="PCF8574 create a device"
    //% weight=100 blockGap=8
    //% parts="PCF8574"
    //% blockSetVariable=device
    export function create( addr : Address = Address.ADDR_0x20 ) : Device { 
        let device = new Device()
        device.buf = null
        device.i2c_addr = addr
        return device
    }
    
} 
///////////////////////////////////////////////////////////////////////////////
