export function registersSelectColors(){
	const skin = [
		"#FCE8D5",
		"#FAD6A5",
		"#F8C471",
		"#F39C12",
		"#E67E22",
		"#BA4A00",
		"#6E2C00",
		"#E08E79",
		"#D27D56",
		"#B7632B"
	];

	const hair = [
		"#000000",
		"#321414",
		"#654321",
		"#8B4513",
		"#A52A2A",
		"#CD853F",
		"#DAA520",
		"#B8860B",
		"#A9A9A9",
		"#D3D3D3"
	];

	const lips = [
		"#FFC0CB",
		"#FF1493",
		"#C71585",
		"#800080",
		"#8A2BE2",
		"#FF4500",
		"#DC143C",
		"#B22222",
		"#CD5C5C",
		"#FF0000"
	];

	const eyes = [
		"#775E46",
		"#8B4513",
		"#556B2F",
		"#4682B4",
		"#708090",
		"#FFBF00",
		"#000000",
		"#5F9EA0",
		"#B0E0E6",
		"#ADFF2F"
	];

	const underwear = [
		"#FFFFFF",
		"#000000",
		"#000080",
		"#808080",
		"#FF0000",
		"#ADD8E6",
		"#FFC0CB",
		"#008000",
		"#800080",
		"#F5F5DC"
	];

	const selectedColor = reactive<{
		skin: string, 
		hair: string,
		lips: string,
		eyes: string,
		eyebrow: string,
		underwear: string,
	}>({
		skin: skin[1], 
		hair: hair[2],
		lips: lips[8],
		eyes: eyes[3],
		eyebrow: hair[3],
		underwear: underwear[1]
	});

	return {
		colors: {
			skin,
			hair,
			lips,
			eyes,
			eyebrow: hair,
			underwear,
		},
		selectedColor
	};
}
