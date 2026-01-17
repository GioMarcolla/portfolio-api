import { EducationDBType } from "../db/db.pgSchema";
import { EducationType } from "../zod/schemas/education.zSchema";

export const parseEducation = (data: EducationDBType[]): EducationType[] => {
    return data.map((item) => {
        const data: EducationType = {
            id: item.id,
            Position: item.position,
            Institution: item.institution,
            Location: {
                Country: item.locationCountry,
                State: item.locationState,
                City: item.locationCity,
            },
            Degree: item.degree,
            DegreeShort: item.degreeShort || undefined,
            Major: item.major || undefined,
            Track: item.track || undefined,
            DateStarted: {
                Year: item.dateStartedYear,
                Month: item.dateStartedMonth,
                Day: item.dateStartedDay || undefined,
            },
            DateCompleted:
                item.dateCompletedYear && item.dateCompletedMonth
                    ? {
                          Year: item.dateCompletedYear,
                          Month: item.dateCompletedMonth,
                          Day: item.dateCompletedDay || undefined,
                      }
                    : undefined,
            Completed: item.completed,
        };

        return data;
    });
};
