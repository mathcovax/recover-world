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
] as const;

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
] as const;

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
] as const;

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
] as const;

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
] as const;

export const modelsZod = zod.object({
	body: zod.number().min(0).max(0),
	hair: zod.number().min(0).max(1),
});

export const colorsZod = zod.object({
	skin: zod.enum(skin), 
	hair: zod.enum(hair),
	lips: zod.enum(lips),
	eyes: zod.enum(eyes),
	eyebrow: zod.enum(hair),
	underwear: zod.enum(underwear)
});
