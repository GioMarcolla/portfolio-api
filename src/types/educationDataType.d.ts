import { BasicLocationType } from "./basicLocationType.js";
import { BasicDateType } from "./basicDateType.js";

export type EducationDateStartedType = BasicDateType;

export type EducationDateCompletedType = BasicDateType;

export type EducationLocationType = BasicLocationType;

export type EducationDataType = {
    id: number;
    Institution: string;
    Location: EducationLocationType;
    Degree: string;
    DegreeShort: string;
    Major: string;
    Track?: string;
    DateStarted: EducationDateStartedType;
    DateCompleted?: EducationDateCompletedType;
    Completed: boolean;

    toString: () => string;
};
