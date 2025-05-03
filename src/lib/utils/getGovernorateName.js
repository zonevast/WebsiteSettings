export const governorates = [
  {
    id: 18,
    name: "Al Anbar",
    alternate_names: "محافظة الأنبار",
    code: "IQ.AN",
  },
  {
    id: 17,
    name: "Al Muthanna Governorate",
    alternate_names: "محافظة المثنى",
    code: "IQ.MU",
  },
  {
    id: 16,
    name: "Al Qādisīyah",
    alternate_names: "محافظة القادسية",
    code: "IQ.QD",
  },
  {
    id: 15,
    name: "An Najaf",
    alternate_names: "محافظة النجف",
    code: "IQ.NJ",
  },
  {
    id: 12,
    name: "Bābil",
    alternate_names: "محافظة بابل",
    code: "IQ.BB",
  },
  {
    id: 11,
    name: "Baghdad",
    alternate_names: "محافظة بغداد",
    code: "IQ.BG",
  },
  {
    id: 1,
    name: "Basra",
    alternate_names: "محافظة البصرة",
    code: "IQ.BA",
  },
  {
    id: 9,
    name: "Dhi Qar",
    alternate_names: "محافظة ذي قار",
    code: "IQ.DQ",
  },
  {
    id: 8,
    name: "Diyālá",
    alternate_names: "محافظة ديالى",
    code: "IQ.DI",
  },
  {
    id: 10,
    name: "Duhok",
    alternate_names: "محافظة دهوك",
    code: "IQ.DH",
  },
  {
    id: 7,
    name: "Erbil",
    alternate_names: "محافظة أربيل",
    code: "IQ.ER",
  },
  {
    id: 19,
    name: "Halabja Governorate",
    alternate_names: "محافظة حلبجة",
    code: "IQ.HL",
  },
  {
    id: 6,
    name: "Karbalāʼ",
    alternate_names: "محافظة كربلاء",
    code: "IQ.KR",
  },
  {
    id: 13,
    name: "Kirkuk",
    alternate_names: "محافظة كركوك",
    code: "IQ.KI",
  },
  {
    id: 5,
    name: "Maysan",
    alternate_names: "محافظة ميسان",
    code: "IQ.MI",
  },
  {
    id: 4,
    name: "Nineveh",
    alternate_names: "محافظة نينوى",
    code: "IQ.NI",
  },
  {
    id: 3,
    name: "Salah ad Din",
    alternate_names: "محافظة صلاح الدين",
    code: "IQ.SD",
  },
  {
    id: 14,
    name: "Sulaymaniyah",
    alternate_names: "محافظة السليمانية",
    code: "IQ.SL",
  },
  {
    id: 2,
    name: "Wāsiţ",
    alternate_names: "محافظة واسط",
    code: "IQ.WA",
  },
];


export const getGovernorateName = (id, locale) => {
  const governorate = governorates.find((g) => g.id === id);
  if (!governorate) return "Governorate not found";

  if (locale === "ar") {
    // Extract the first Arabic name from alternate_names if available
    const arabicName = governorate.alternate_names
      .split(";")
      .find((name) => /[\u0600-\u06FF]/.test(name)); // Arabic characters range
    return arabicName || "Arabic name not available";
  } else {
    // Default to English
    return (
      governorate.name_ascii || governorate.name || "English name not available"
    );
  }
};
