import { BiodataDBType } from "../db/db.pgSchema";
import { BiodataType } from "../zod/schemas/index";

export const parseBiodata = (item: BiodataDBType): BiodataType => {
    return {
        Name: {
            First: item.firstName,
            Middle: item.middleName || undefined,
            Last: item.lastName,
        },
        Nickname: item.nickname || undefined,
        Nationalities: item.nationalities.split(","),
        Birthdate: {
            Year: item.birthYear,
            Month: item.birthMonth,
            Day: item.birthDay || undefined,
        },
        Gender: item.gender,
        Profession: item.profession,
        ResidentOf: {
            Country: item.residentCountry,
            State: item.residentState,
            City: item.residentCity,
        },
    } as BiodataType;
};
