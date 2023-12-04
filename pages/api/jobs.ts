// pages/api/items.ts
import { NextApiRequest, NextApiResponse } from "next";
const data = [
  {
    id: "1",
    title: "Front end developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "2",
    title: "Sales Developer",
    country: "Lebanon",
    city: "Beirut",
    sector: "Sales",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "4",
    title: "Back end developer",
    country: "Saudi Arabia",
    city: "Jeddah",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "6",
    title: "Full stack developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },

  {
    id: "7",
    title: "Seiner Front end developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "8",
    title: "Seiner Sales Developer",
    country: "Lebanon",
    city: "Beirut",
    sector: "Sales",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "9",
    title: "Seiner Back end developer",
    country: "Saudi Arabia",
    city: "Jeddah",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "10",
    title: "Seiner Full stack developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "11",
    title: "Junior Front end developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "12",
    title: "Junior Sales Developer",
    country: "Lebanon",
    city: "Beirut",
    sector: "Sales",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "14",
    title: "Junior Back end developer",
    country: "Saudi Arabia",
    city: "Jeddah",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    id: "15",
    title: "Junior Full stack developer",
    country: "Egypt",
    city: "Cairo",
    sector: "Computer Software",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
];

export interface Job {
  id: string;
  title: string;
  country: string;
  city: string;
  sector: string;
  description: string;
}
export interface JobRequest {
  title: string;
  countries: string[];
  cities: string[];
  sectors: string[];
  page: string;
  per_page: string;
}
export interface JobResponse {
  jobs: Job[];
  total: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  req: NextApiRequest,
  res: NextApiResponse<JobResponse | boolean>
) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      // Get query parameters for filtering and pagination
      const {
        countries,
        sectors,
        cities,
        title,
        page = "1",
        per_page = "10",
      } = req.query;

      // Convert comma-separated strings to arrays
      const countryList = (countries as string)?.split(",");
      const sectorList = (sectors as string)?.split(",");
      const cityList = (cities as string)?.split(",");
      // Apply filters
      const filteredJobs = data.filter((job: Job) => {
        const matchesCountry =
          !countryList || countryList.includes(job.country);
        const matchesSector = !sectorList || sectorList.includes(job.sector);
        const matchesCity = !cityList || cityList.includes(job.city);
        const matchesTitle =
          !title ||
          job.title.toLowerCase().includes((title as string).toLowerCase());
        return matchesCountry && matchesSector && matchesCity && matchesTitle;
      });
      // Calculate pagination
      const start =
        (parseInt(page as string) - 1) * parseInt(per_page as string);
      const end = start + parseInt(per_page as string);
      const paginatedJobs = filteredJobs.slice(start, end);

      res.status(200).json({ jobs: paginatedJobs, total: filteredJobs.length });
      break;

    case "DELETE":
      if (id) {
        const index = data.findIndex((j) => j.id === id);
        data.splice(index, 1)[0];
        res.status(200).json(true);
      }

      break;

    case "POST":
      // Handle POST request to create a new job
      const newJob: Job = {
        id: String(Date.now()), // Simple way to generate a unique ID (you may want to use a more robust solution)
        ...req.body,
      };

      data.unshift(newJob);
      res.status(201).json(true);
      break;

    case "PUT":
      // Handle PUT or PATCH request to edit a specific job
      if (req.body.id) {
        const index = data.findIndex((j) => j.id === req.body.id);
        // Update the job with the new data
        const updatedJob = { ...data[index], ...req.body };
        data[index] = updatedJob;

        res.status(200).json(true);
      }
      break;

    default:
      res.status(405).json(false);
  }
};
