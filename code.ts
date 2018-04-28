namespace smartPH {

		export enum Ports {
				//% block="P0"
				P0,
				//% block="P1"
				P1,
				//% block="P2"
				P2,
				//% block="P3"
				P3,
				//% block="P4"
				P4,
				//% block="P10"
				P10
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
		export function readPhNumber(ports: Ports, offset: number): number {

			let temp = 0;
			switch (ports) {
					case Ports.P0:
							temp = AnalogPin.P0;
							break;
					case Ports.P1:
							temp = AnalogPin.P1;
							break;
					case Ports.P2:
							temp = AnalogPin.P2;
							break;
					case Ports.P3:
							temp = AnalogPin.P3;
							break;
					case Ports.P4:
							temp = AnalogPin.P4;
							break;
					case Ports.P10:
							temp = AnalogPin.P10;
							break;
			}
			basic.showNumber(temp);
			let sensorarray: number[] = []
			for (let i = 0; i < 10; i++) {
						sensorarray.push(pins.analogReadPin(temp))
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
