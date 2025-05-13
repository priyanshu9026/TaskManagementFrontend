import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: '/tasks', method: 'get', headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: 'delete', headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="my-6 mx-auto max-w-4xl px-4 py-6 bg-gray-50 rounded-lg shadow-lg">
      {tasks.length !== 0 && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Tasks <span className="text-blue-500">({tasks.length})</span>
        </h2>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
              <span className="text-lg text-gray-600">No tasks found</span>
              <Link
                to="/tasks/add"
                className="mt-4 bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-6 py-2 transition-all"
              >
                + Add New Task
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-medium text-gray-800">
                      Task #{index + 1}
                    </span>
                    <Tooltip text="Edit this task" position="top">
                      <Link
                        to={`/tasks/${task._id}`}
                        className="ml-auto text-green-600 hover:text-green-700 transition-colors"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>
                    <Tooltip text="Delete this task" position="top">
                      <span
                        className="ml-4 text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                        onClick={() => handleDelete(task._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <div className="text-gray-600 whitespace-pre-line">
                    {task.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;