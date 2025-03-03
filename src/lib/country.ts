import { getCountryCode, getCountryData, getCountryDataList, ICountryData } from "countries-list";

export const additionalRegions = [
  { name: "Scotland", parent: "United Kingdom", code: "gb-sct" },
  { name: "Wales", parent: "United Kingdom", code: "gb-wls" },
  { name: "England", parent: "United Kingdom", code: "gb" },
  { name: "Northern Ireland", parent: "United Kingdom", code: "gb-nir" },
];

export const countryOptions = [
  ...getCountryDataList().map((countryData: ICountryData) => countryData.name),
  ...additionalRegions.map((region) => region.name),
].sort((a, b) => a.localeCompare(b));

export function countryNameToCode(countryName: string): string {
    const additionalRegion = additionalRegions.find((it) => it.name == countryName)
    if (additionalRegion) {
      return additionalRegion.code;
    }
    
    return getCountryCode(countryName).toString().toLowerCase();
  }