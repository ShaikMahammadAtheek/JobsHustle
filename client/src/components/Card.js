/*import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css'; // Import CSS
import './Card.css';
const Card = ({ job }) => {
//LATER WE THINK aBOUT THISS IMAGE
//<img src={job.companyImage} alt={job.companyName} />

//<div className="card">
//{job.imageUrl && <img src={job.imageUrl} alt={job.title} className="job-card-image" />}
//<h3>{job.jobTitle}</h3>
//<p>{job.jobDescription}</p>
//<Link to={`/job/${job._id}`}>View Details</Link>
//</div>

    return (
      <div className="card">
      <Link to={`/job/${job._id}`} className="apply-btn">{job.imageUrl && <img src={job.imageUrl} alt={job.title} className="card-image" />}</Link>
      <div className="card-content">
          <h3 className="card-title">{job.title}</h3>
          <p className="card-company">{job.company}</p>
          <p className="card-location">{job.location}</p>
          <p className="card-description">{job.description}</p>
          <h1>{job.date && <p className="card-date">{new Date(job.date).toLocaleDateString()}</p>}</h1>
          <Link to={`/job/${job._id}`} className="apply-btn">View Details</Link>
      </div>
  </div>
    );
};

export default Card;

*/

//Main code

// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Card.css';
// import './Card.css';

// const Card = ({ job }) => {
//   const jobDescription = job.jobDescription || {};
//   return (
//     <div className="card">
//       {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="card-image img-fluid Sets_apart_logo setsail_logo" />}
//       <h1 className="card-title">{job.title}
//       </h1>
//     <p className="card-company"> <b>Hirring Type: </b>{jobDescription.jobType}</p>
      
//       <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>

//       <Link to={`/job/${job._id}`} className="card-link">View Details</Link>
//     </div>
//   );
// };

// export default Card;








import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/Card.css';
import './Card.css';
const Card = ({ job }) => {
  const jobDescription = job.jobDescription || {};
  return (
    
    <div className="card">
      
      <Link to={`/job/${job._id}`} className='HomesJobidLink'>
      {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="card-image img-fluid Sets_apart_logo setsail_logo" />}
      <h1 className="card-title">{job.title}
      </h1>

      <p className="card-company"><b>Hirring Type:</b> {jobDescription.jobType}</p>
      {/* <p className="card-description">
        {job && job.description
          ? (job.description.length > 40
            ? job.description.slice(0, 40) + '...'
            : job.description)
          : "No description available"}
      </p> */}

      <p className="card-location">Location: {job.location}</p>
      <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>
      </Link>
      
      {/* <Link to={`/job/${job._id}`} className="card-link cardbutton">View Details</Link> */}
    </div>
    
  );
};

export default Card;








 /* <p className="card-description">
        {job && job.description
          ? (job.description.length > 40
            ? job.description.slice(0, 40) + '...'
            : job.description)
          : "No description available"}
      </p> */
//important code ....
/*
import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/Card.css';
import './Card.css';
const Card = ({ job }) => {
  const jobDescription = job.jobDescription || {};
  return (
    <div className="card">
      
      {job.imageUrl && <img src={job.imageUrl} alt={job.title} className="card-image img-fluid Sets_apart_logo setsail_logo" />}
      <h1 className="card-title">{job.title}
      </h1>

      <p className="card-company"><b>Hirring Type:</b> {jobDescription.jobType}</p>
     

      <p className="card-location">Location: {job.location}</p>
      <h1>{job.walkInDate && <p className="card-date">{new Date(job.walkInDate).toLocaleDateString()}</p>}</h1>
    
      <Link to={`/job/${job._id}`} className="card-link cardbutton">View Details</Link>
      
    
    </div>
  );
};

export default Card;

*/




















































/* important 
//new code 
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="job-card">
            <img src={job.imageUrl} alt={job.title} />
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <Link to={`/job/${job._id}`}>
                <button>View Details</button>
            </Link>
        </div>
    );
};

export default JobCard;

*/

/*import React from 'react';
import './Card.css'; // Create this file for styling

const Card = ({ job }) => {
  return (
    <div className="card">
      <img src={job.companyImage} alt={job.jobTitle} className="card-image"/>
      <h3>{job.jobTitle}</h3>
      <p>{job.jobDescription}</p>
      <a href={`/job/${job.id}`} className="apply-btn">View Job</a>
    </div>
  );
};

export default Card;
*/
