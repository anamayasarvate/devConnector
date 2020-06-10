import React from 'react';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
import { useDispatch } from 'react-redux';

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const educations = education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className='hide-sm'>{edu.degree}</td>
        <td className='hide-sm'>
          <Moment format='MM/DD/YYYY'>{edu.from}</Moment> -{' '}
          {edu.current ? 'Now' : <Moment format='MM/DD/YYYY'>{edu.to}</Moment>}
        </td>
        <td>
          <button
            onClick={(e) => dispatch(deleteEducation(edu._id))}
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
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
