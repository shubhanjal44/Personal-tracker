import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New topic form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('to learn');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/topics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTopics(response.data);
      } catch (err) {
        setError('Failed to fetch topics.');
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [token]);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!title) {
      setFormError('Title is required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/topics', 
        { title, category, status, notes }, 
        { headers: { Authorization: `Bearer ${token}` } });
      setTopics(prev => [...prev, response.data]);
      setTitle('');
      setCategory('');
      setStatus('to learn');
      setNotes('');
    } catch (err) {
      setFormError('Failed to add topic.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Learning Topics</h1>
      <button onClick={logout}>Logout</button>

      <form onSubmit={handleAddTopic} style={{ marginTop: '20px', marginBottom: '20px' }}>
        <h3>Add New Topic</h3>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <input 
          type="text" placeholder="Title" value={title} 
          onChange={(e) => setTitle(e.target.value)} required 
        />
        <input 
          type="text" placeholder="Category (optional)" value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="to learn">To Learn</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <textarea 
          placeholder="Notes (optional)" value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
        />
        <button type="submit">Add Topic</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {topics.length === 0 ? (
        <p>No topics found. Add some!</p>
      ) : (
        <ul>
          {topics.map(topic => (
            <li key={topic._id}>
              <strong>{topic.title}</strong> - {topic.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
