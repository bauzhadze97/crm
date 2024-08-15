import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile/index';
import Navigation from '../../components/Navigation';
import { Box, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NotesEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Logic to save the note (e.g., sending the data to a backend)
    console.log({ title, content });
  };

  return (
    <div className="vacation-dashboard-container">
      <Sidebar />
      <div className="middle-wrapper flex pl-10">
        <div className="grow-0">
          <Profile />
        </div>
        <main className="vacation-main-content grow">
          <Navigation link="/notes" />
          <div className="flex flex-col items-center">
            <div className="vacation-main-header border-[3px] border-[#105D8D] w-[100%] mb-4">
              <h1 style={{ color: '#007dba' }} className="font-semibold text-xl">
                My Notes
              </h1>
            </div>
            <Box
              sx={{
                width: '100%',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
              }}
            >
              {/* Header with Back and Save buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton>
                  <ArrowBackIcon sx={{ color: '#007dba' }} />
                </IconButton>
                <IconButton onClick={handleSave}>
                  <SaveIcon sx={{ color: '#007dba' }} />
                </IconButton>
              </Box>

              {/* Title Input */}
              <TextField
                variant="standard"
                placeholder="Tittle.."
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: '24px', fontWeight: 'bold' },
                }}
                sx={{ mb: 2 }}
              />

              {/* Content Input */}
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Type here..."
                theme="snow"
                style={{ height: '300px', marginBottom: '50px' }}
              />

  
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesEditor;
