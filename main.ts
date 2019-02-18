
enum BH1750Address {
	//% block="0x23"
    ADDR_PIN_LOW  = 0x23,
	//% block="0x5c"
    ADDR_PIN_HIGH = 0x5C
}
/*
 * BH1750 functions
 */

//% color="#2c4e20" weight=100  
namespace BH1750 {

    let i2c_addr = BH1750Address.ADDR_PIN_LOW

    /**
     * set the I2C address of BH1750, 
     * @param addr is the 7-bit I2C address of BH1750 module
     */
    //% blockId="BH1750_SET_ADDRESS" block="bh1750 set address %addr"
    //% weight=100 blockGap=8
    export function setAddress(addr: BH1750Address): void {
        i2c_addr = addr
    }

    /**
     * initialize BH1750 by turning the device on and
     * then sending a soft-reset command.
     */
    //% blockId="BH1750_BEGIN" block="bh1750 begin %addr"
    //% weight=90 blockGap=8
    export function begin( addr : BH1750Address = BH1750Address.ADDR_PIN_LOW ): void {
        // power on
        pins.i2cWriteNumber(i2c_addr, 0x01, NumberFormat.UInt8BE)
        // reset
        pins.i2cWriteNumber(i2c_addr, 0x07, NumberFormat.UInt8BE)
		basic.pause(10)
        // set measurement mode
        pins.i2cWriteNumber(i2c_addr, 0x10, NumberFormat.UInt8BE)
		basic.pause(150)
    }

    /**
     * turn on BH1750 to operate in continuous measurement mode
     */
    //% blockId="BH1750_ON" block="bh1750 turn on"
    //% weight=90 blockGap=8
    export function powerOn(): void {
        // power on
        pins.i2cWriteNumber(i2c_addr, 0x01, NumberFormat.UInt8BE)
        // set measurement mode
        pins.i2cWriteNumber(i2c_addr, 0x10, NumberFormat.UInt8BE)
        basic.pause(150)
    }

    /**
     * turn off BH1750, to reduce power consumption.
     */
    //% blockId="BH1750_OFF" block="bh1750 turn off"
    //% weight=90 blockGap=8
    export function powerOff(): void {
        pins.i2cWriteNumber(i2c_addr, 0x00, NumberFormat.UInt8BE)
    }

    /**
     * get the level of ambient light (lx)
     */
    //% blockId="BH1750_GET_INTENSITY" block="bh1750 get intensity (lx)"
    //% weight=80 blockGap=8
    export function getIntensity(): number {
        return Math.idiv(pins.i2cReadNumber(i2c_addr, NumberFormat.UInt16BE) * 5, 6)
    }
}  
