import { BasicLocationType } from "./basicLocationType.js";
import { BasicDateType } from "./basicDateType.js";

export type BioDataNameType = {
    First: string;
    Middle?: string;
    Last: string;
};

export type BioDataBirthdateType = BasicDateType;

export type BioDataResidentOfType = BasicLocationType;

export type BioDataType = {
    Name: BioDataNameType;
    Nickname: string;
    Birthdate: BioDataBirthdateType;
    Gender: string;
    Profession: string;
    Nationalities: Array<string>;
    ResidentOf: BioDataResidentOfType;
};
