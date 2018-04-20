namespace smartPH {

		export enum ports {
				//% blockId=port0
				//% block="P0"
				P0,
				//% blockId=port1
				//% block="P1"
				P1
		}

		let ph_value = ""
		//% blockId="readPH"
		//% block="Read PH value (string with decimal)"
		//% weight=41
    export function readPH(): string {
			let sensorarray: number[] = []
			for (let i = 0; i < 10; i++) {
						sensorarray.push(pins.analogReadPin(AnalogPin.P0))
						basic.pause(10)
				}
				sensorarray.sort((n1, n2) => n1 - n2);
			for (let value of sensorarray) {
						serial.writeLine(value.toString())
				}
				ph_value = (sensorarray[5] * 5 * 10 * 35/ 1024 ).toString()
			serial.writeLine("===========")
				if ( ph_value.length == 3) {
						serial.writeLine("PH: " + ph_value.substr(0, 1) + "." + ph_value.substr(1,  ph_value.length))
						return ph_value.substr(0, 1) + "." + ph_value.substr(1,  ph_value.length)
				} else {
						serial.writeLine("PH: " + ph_value.substr(0, 2) + "." + ph_value.substr(2,  ph_value.length))
						return ph_value.substr(0, 2) + "." + ph_value.substr(2,  ph_value.length)
				}
    }
		let ph_value_number = 0
		//% blockId="readPHNumber"
		//% block="Read PH value (x100) pin %ports| offset %offset"
		//% weight=40
		export function readPhNumber(ports: ports, offset: number): number {
			let sensorarray: number[] = []
			for (let i = 0; i < 10; i++) {
						sensorarray.push(pins.analogReadPin(AnalogPin.P0))
						basic.pause(10)
				}
				sensorarray.sort((n1, n2) => n1 - n2);
			for (let value of sensorarray) {
						serial.writeLine(value.toString())
				}
				ph_value_number = (sensorarray[5] * 5 * 10 * 35/ 1024) + offset
				return ph_value_number
		}

}
