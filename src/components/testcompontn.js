import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogsCompleted } from '../redux/chatActions';

const TestComponent = () => {
  const dispatch = useDispatch();
  const logsCompleted = useSelector(state => state.chat.logsCompleted);

  return (
    <div>
      <p>Logs Completed: {logsCompleted.toString()}</p>
      <button onClick={() => dispatch(setLogsCompleted(!logsCompleted))}>
        Toggle Logs Completed
      </button>
    </div>
  );
};

export default TestComponent;
