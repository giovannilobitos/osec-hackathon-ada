import React, {
  useState,
  useEffect,
  // useMemo,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';

export default function StudentList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [studentIds, setStudentIds] = useState(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const students = await props.getUsers({ teacher_id: props.mainUser._id });
      setStudentIds(students.data.map(({ _id }) => _id));
    } catch (error) {
      console.log({ error }); // TODO: Add Toastr
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      List of Students <Link to="/students/add">Add New</Link>
      <hr />
      {
        JSON.stringify(studentIds)
      }
    </div>
  );
}
