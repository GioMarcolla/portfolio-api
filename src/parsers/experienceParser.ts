import { ExperienceDBType } from "../db/db.pgSchema.js";
import { ExperienceType } from "../zod/schemas/experience.zSchema.js";

export const parseExperience = (
    data: ExperienceDBType[]
): ExperienceType[] => {
    return data.map((item) => {
        const data: ExperienceType = {
            id: item.id,
            Position: item.position,
            CompanyName: item.companyName,
            Department: item.department || undefined,
            Team: item.team || undefined,
            Location: {
                Country: item.locationCountry,
                State: item.locationState,
                City: item.locationCity,
            },
            JobTitle: item.jobType,
            JobType: item.jobType,
            Level: item.level || undefined,
            Responsibilities: item.responsibilities,
            Description: item.description,
            Achievements: item.achievements || undefined,
            DateStarted: {
                Year: item.dateStartedYear,
                Month: item.dateStartedMonth,
                Day: item.dateStartedDay || undefined,
            },
            DateEnd:
                item.dateEndYear && item.dateEndMonth
                    ? {
                          Year: item.dateEndYear,
                          Month: item.dateEndMonth,
                          Day: item.dateEndDay || undefined,
                      }
                    : undefined,
            CurrentJob: item.currentJob,
            // Skills: item.skills || undefined,
        };

        return data;
    });
};
