import { BasicDateType } from "./basicDateType";
import { BasicLocationType } from "./basicLocationType";

export type ExperienceDateStartedType = BasicDateType;

export type ExperienceDateEndType = BasicDateType;

export type ExperienceLocationType = BasicLocationType;

export type ExperienceDataType = {
    id: number;
    CompanyName: string;
    Department?: string;
    Team?: string;
    Location: ExperienceLocationType;
    JobTitle: string;
    JobType: "Contract" | "Part-Time" | "Full-Time" | "Internship";
    Level?:
        | "Junior"
        | "Mid"
        | "Senior"
        | "Staff"
        | "Lead"
        | "Manager"
        | "Director"
        | "VP"
        | "Founder"
        | "C-Suite";
    Description: string;
    Responsibilities: string;
    Achievements?: string;
    DateStarted: ExperienceDateStartedType;
    DateEnd?: ExperienceDateEndType;
    CurrentJob?: Boolean;
};
