import type { JobApplication } from "../types/application";
import StatuBadge from "./StatusBadge";

type ApplicationProps = {
  applicationData: JobApplication;
};

const ApplicationCard = ({ applicationData }: ApplicationProps) => {
  return (
    <div className="px-4">
      <h1>{applicationData.company}</h1>
      <p>{applicationData.position}</p>
      <div>
        <p>{applicationData.location}</p>
        <p>{applicationData.jobType}</p>
      </div>
      <p>Applied: {applicationData.appliedDate}</p>
      <StatuBadge status={applicationData.status} />
    </div>
  );
};

export default ApplicationCard;
