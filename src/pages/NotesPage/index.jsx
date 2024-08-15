import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile/index';
import Navigation from '../../components/Navigation';
import NoteImage from '../../assets/images/illustration.png'; // Ensure this path is correct
import { Box, Typography, Button, Card, CardContent, TextField } from '@mui/material';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleGetStarted = () => {
    navigate('/notes-editor'); // Navigate to the Notes Editor page
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
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
                My Notes
              </h1>
            </div>
            <Box sx={{ width: '80%', paddingBottom: '20px', textAlign: 'center' }}>
              {/* If there are no notes, show the empty state */}
              {notes.length === 0 ? (
                <Box sx={{ marginTop: '50px' }}>
                  <Card
                    sx={{
                      padding: '20px',
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: '15px',
                    }}
                  >
                    <img
                      src={NoteImage} // Correct usage of the image
                      alt="Empty Notes"
                      style={{ marginBottom: '20px', width: '200px' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                      It's Empty
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666666', marginBottom: '20px' }}>
                      Hmm... Looks like you don’t have any notes.
                    </Typography>
                    <Button
                      onClick={handleGetStarted} // Corrected click handler
                      variant="contained"
                      sx={{
                        backgroundColor: '#007dba',
                        color: '#ffffff',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Get Started
                    </Button>
                  </Card>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ marginBottom: '20px' }}>
                    <TextField
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      label="Add a new note"
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: '20px' }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddNote}
                      sx={{
                        backgroundColor: '#007dba',
                        color: '#ffffff',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      Add Note
                    </Button>
                  </Box>
                  {/* Display the list of notes */}
                  {notes.map((note, index) => (
                    <Card key={index} sx={{ marginBottom: '15px', padding: '20px', borderRadius: '15px' }}>
                      <CardContent>
                        <Typography variant="body1" sx={{ fontFamily: '"BPG Rioni", sans-serif' }}>
                          {note}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesPage;
