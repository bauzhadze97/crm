import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile/index';
import Navigation from '../../components/Navigation';
import { Box, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createNote, updateNote, getNote } from '../../services/note';

const NotesEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchNote = async () => {
        try {
          const response = await getNote(id);
          console.log(response.data); // Inspect the structure of the response
          
          // Update based on your data structure
          setTitle(response.data.title);
          setContent(response.data.note);
        } catch (error) {
          setError('Failed to load note data.');
        }
      };
      fetchNote();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      const data = { title, content };
      if (isEdit) {
        await updateNote(id, data);
      } else {
        await createNote(data);
      }
      navigate('/notes');
    } catch (error) {
      setError('Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
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
                {isEdit ? 'Edit Note' : 'Create Note'}
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => navigate('/notes')}>
                  <ArrowBackIcon sx={{ color: '#007dba' }} />
                </IconButton>
                <IconButton onClick={handleSave} disabled={loading}>
                  <SaveIcon sx={{ color: '#007dba' }} />
                </IconButton>
              </Box>

              <TextField
                variant="standard"
                placeholder="Title.."
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: '24px', fontWeight: 'bold' },
                }}
                sx={{ mb: 2 }}
              />

              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Type here..."
                theme="snow"
                style={{ height: '300px', marginBottom: '50px' }}
              />

              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesEditor;
