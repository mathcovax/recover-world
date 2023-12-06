import {duplo} from "../../main";
	
export const isOdd = duplo.createChecker(
	"isOdd",
	{
		handler(number: number, output){
			if(number % 2 === 0){
				return output("odd", number);
			}
			else {
				return output("notOdd", number);
			}
		},
		outputInfo: ["odd", "notOdd"]
	}
);

