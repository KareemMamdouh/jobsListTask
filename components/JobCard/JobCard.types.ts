interface JobCardProps {
  id: string;
  title: string;
  country: string;
  city: string;
  sector: string;
  description: string;
  handleEdit?: (e: JobCardProps) => void;
}
