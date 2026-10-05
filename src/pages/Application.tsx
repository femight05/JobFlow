import ApplicationCard from "../components/ApplicationCard";
import { application } from "../data/application";

const Application = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1>Application</h1>
        <button>+ Add Jobs</button>
      </div>
      <div className="flex justify-between items-center my-4">
        <input
          type="search"
          name="search"
          placeholder="Search applications..."
        />
        <label htmlFor="status">Filter:</label>
        <select name="status" id="status">
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        {application.map((application) => (
          <ApplicationCard key={application.id} applicationData={application} />
        ))}
      </div>
    </div>
  );
};

export default Application;
