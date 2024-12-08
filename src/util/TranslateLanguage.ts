export const languageNames = [
  { code: "en", displayName: "English", orientation: "left" },
  { code: "fa", displayName: "فارسی", orientation: "right" },
  { code: "cn", displayName: "中文", orientation: "left" },
];

export const translationObject: TranslateObject = {
  en: {
    "Reap": "Reap",
    "Sow": "Sow",
    "Up": "Up",
    "Down": "Down",
    "Left": "Left",
    "Right": "Right",
    "Undo": "Undo",
    "Redo": "Redo",
    "Plant Species": "Plant Species",
    "Aloe Vera": "Aloe Vera",
    "Wheat": "Wheat",
    "Flytrap": "Flytrap",
    "Water Level": "Water Level",
    "Sun Level": "Sun Level",
    "Growth Level": "Growth Level",
    "Save": "Save",
    "Load": "Load",
    "Next Turn": "Next Turn",
    "Slot 1": "Slot 1",
    "Slot 2": "Slot 2",
    "Slot 3": "Slot 3",
    "Slot 4": "Slot 4",
    "Language": "Language",
    "Select a plant species": "Select a plant species",
    "Select a planterbox": "",
    "Select a Language": "Select a Language",
    "Cell i": "Cell i",
    "Cell j": "Cell j",
    "Cell": "Cell",
    "Planterbox": "Planterbox",
    "Selected PlanterBox": "",
    "No Cell Selected": "No Cell Selected",
    "none": "none",
    "Game is automatically saved after every turn, but you can manually save at any point":
      "Game is automatically saved after every turn, but you can manually save at any point",
    "Loading": "Loading",
    "Loading Cells ...": "Loading Cells ...",
    "Current Level": "Current Level",
    "Current Turn": "Current Turn",
  },
  cn: {
    "Reap": "收割",
    "Sow": "播种",
    "Up": "上",
    "Down": "下",
    "Left": "左",
    "Right": "右",
    "Undo": "撤销",
    "Redo": "重做",
    "Plant Species": "植物种类",
    "Aloe Vera": "芦荟",
    "Wheat": "小麦",
    "Flytrap": "捕蝇草",
    "Water Level": "水位",
    "Sun Level": "阳光水平",
    "Growth Level": "生长水平",
    "Save": "保存",
    "Load": "加载",
    "Next Turn": "下一回合",
    "Slot": "插槽",
    "Language": "语言",
    "Select a plant species": "选择一种植物种类",
    "Select a planterbox": "选择种植箱",
    "Select a Language": "选择一种语言",
    //horizontal instead of i in chinese
    "Cell i": "单元横横",
    //vertical instead of j in chinese
    "Cell j": "单元竖纵",
    "Cell": "单元格",
    "Planterbox": "种植箱",
    "Selected PlanterBox": "已选择的种植箱",
    "No Cell Selected": "没有选择任何单元格",
    "none": "无",
    "Game is automatically saved after every turn, but you can manually save at any point":
      "游戏会在每回合后自动保存，但您可以随时手动保存",
    "Loading": "加载中",
    "Loading Cells ...": "加载单元格 。。。",
    "Current Level": "当前等级",
    "Current Turn": "当前回合",
  },
  fa: {
    "Reap": "درو کردن",
    "Sow": "کاشتن",
    "Up": "بالا",
    "Down": "پایین",
    "Left": "چپ",
    "Right": "راست",
    "Undo": "بازگرداندن",
    "Redo": "انجام دوباره",
    "Plant Species": "گونه‌های گیاهی",
    "Aloe Vera": "آلوئه‌ورا",
    "Wheat": "گندم",
    "Flytrap": "گیاه گوشت‌خوار",
    "Water Level": "سطح آب",
    "Sun Level": "سطح نور خورشید",
    "Growth Level": "سطح رشد",
    "Save": "ذخیره",
    "Load": "بارگذاری",
    "Next Turn": "نوبت بعدی",
    "Slot": "اشکاف",
    "Language": "زبان",
    "Select a plant species": "یک گونه گیاهی انتخاب کنید",
    "Select a planterbox": "یک جعبه کاشت انتخاب کنید",
    "Select a Language": "یک زبان انتخاب کنید",
    //means cell horizontal instead of i as there is no letter i
    "Cell i": "سلول محور افقی",
    //means cell vertical instead of j as it doesn't have no letter j
    "Cell j": " سلول محور عمودی",
    "Cell": "سلول",
    "Planterbox": "جعبه کاشت",
    "Selected PlanterBox": "جعبه کاشت انتخاب شده",
    "No Cell Selected": "هیچ سلولی انتخاب نشده است",
    "none": "هیچکدام",
    "Game is automatically saved after every turn, but you can manually save at any point":
      "بازی به طور خودکار بعد از هر نوبت ذخیره می‌شود، اما می‌توانید هر لحظه به صورت دستی ذخیره کنید",
    "Loading": "در حال بارگذاری",
    "Loading Cells ...": "...در حال بارگذاری سلول‌ها",
    "Current Level": "سطح فعلی",
    "Current Turn": "نوبت فعلی",
  },
};

export function getStringTranslation(
  key: string,
  currentLanguage: string,
) {
  if (
    translationObject[currentLanguage] &&
    translationObject[currentLanguage][key]
  ) {
    return translationObject[currentLanguage][key];
  }
  return key;
}

export function getNumberTranslation(
  numberToTranslate: number,
  currentLanguage: string,
) {
  let numberString: number | string | undefined;
  if (currentLanguage == "fa") {
    numberString = toFarsiNumerals(numberToTranslate);
  } else {
    numberString = numberToTranslate;
  }
  return numberString;
}

function toFarsiNumerals(num: number): number {
  const farsiMapping: string = "۰۱۲۳۴۵۶۷۸۹";
  // Convert number to string and split into individual digits
  const digitsArray: string[] = num.toString().split("");
  let farsiNumberString: string = "";

  // Use forEach to iterate over each digit
  digitsArray.forEach((digit: string) => {
    //use regex to check if it's a digit
    if (/^\d$/.test(digit)) {
      //Convert the character to a number index
      const index: number = parseInt(digit, 10);
      //Append the corresponding Farsi digit
      farsiNumberString += farsiMapping[index];
    } else {
      return;
    }
  });

  // Convert the Farsi numeral string back to a number
  const numberFromString: number = parseInt(
    farsiNumberString.split("")
      // Map Farsi digits back to indices
      .map((digit) => farsiMapping.indexOf(digit))
      .join(""),
    10,
  );

  return numberFromString;
}
