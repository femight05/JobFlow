const ApplicationForm = () => {
  return (
    <form>
      <label htmlFor="company">Company:</label>
      <input type="text" id="company" name="company" />
      <label htmlFor="position">Position:</label>
      <input type="text" id="position" name="position" />
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" />
      <label htmlFor="jobType">Job Type:</label>
      <select id="jobType" name="jobType">
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="internship">Internship</option>
      </select>
      <label htmlFor="status">Status:</label>
      <select id="status" name="status">
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
    </form>
  );
};

export default ApplicationForm;
