import React from 'react';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
import { useDispatch } from 'react-redux';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const experiences = experience.map((exp) => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className='hide-sm'>{exp.title}</td>
        <td className='hide-sm'>
          <Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
          {exp.current ? 'Now' : <Moment format='MM/DD/YYYY'>{exp.to}</Moment>}
        </td>
        <td>
          <button
            onClick={(e) => dispatch(deleteExperience(exp._id))}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;
