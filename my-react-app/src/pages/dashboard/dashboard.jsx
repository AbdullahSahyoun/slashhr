import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handlePost = () => {
    if (postText.trim() === '') return;

    const newPost = {
      id: Date.now(),
      name: user?.Name || 'User',
      content: postText,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
  

      {/* Main content */}
      <main className="dashboard-main">
        <div className="header">
          <h2>
            Good afternoon, <span className="highlight">
              {user?.Name?.split(' ')[0] || 'User'}!
            </span>
          </h2>
        </div>

        {/* Quick Post Box */}
        <section className="quick-post">
      
          <textarea
            className="post-input"
            placeholder="What's on your mind today?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="post-actions">
            <button><i className="fas fa-image"></i> Gallery</button>
            <button><i className="fas fa-file"></i> Attachment</button>
            <button><i className="fas fa-bullhorn"></i> Shout-out</button>
            <button><i className="fas fa-heart"></i> Value</button>
            <button><i className="fas fa-poll"></i> Poll</button>
          </div>
          <button onClick={handlePost} className="post-btn">Post</button>
        </section>

        {/* Posted Items */}
        <section className="posted-list">
          {posts.map((post) => (
            <div key={post.id} className="post-box">
              <div className="post-header">
                <img src="/imgs/ladylogin.png" alt="User" className="avatar-small" />
                <div>
                  <strong>{post.name}</strong>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </section>

        {/* Optional Birthdays / shoutout sections here */}
      </main>
    </div>
  );
};

export default Dashboard;
