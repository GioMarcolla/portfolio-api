import { ProjectDBType } from "../db/db.pgSchema";
import { ProjectType } from "../zod/schemas/project.zSchema";
import { parseImage } from "./imageParsers";

export const parseProject = (
    data: ProjectDBType[]
): ProjectType[] => {
    return data.map((item) => {
        const data: ProjectType = {
            id: item.id,
            ProjectName: item.projectName,
            Position: item.position,
            Location: {
                Country: item.locationCountry,
                State: item.locationState || undefined,
                City: item.locationCity || undefined,
            },
            JobTitle: item.jobTitle,
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
            CurrentProject: item.currentProject,
            Highlights: item.highlights.map((highlight) => ({
                Position: highlight.position,
                Image: parseImage(highlight.image),
            })) || undefined,
            // Skills: item.skills || undefined,
        };

        return data;
    });
};
