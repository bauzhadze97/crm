import React from 'react';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile/index';
import Navigation from '../../components/Navigation';
import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material';

const DocumentStatusPage = () => {
  // Sample data for the documents
  const requestedDocuments = [
    { id: 1, type: 'Document of Employment', status: 'In Progress' },
  ];

  const approvedDocuments = [
    { id: 2, type: 'Document of Salary', status: 'Approved' },
  ];

  const rejectedDocuments = [
    {
      id: 3,
      type: 'Document of Employment',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'Rejected',
    },
  ];

  return (
    <div className="vacation-dashboard-container">
      <Sidebar />
      <div className="middle-wrapper flex pl-10">
        <div className="grow-0">
          <Profile />
        </div>
        <main className="vacation-main-content grow">
          <Navigation link="/vacation" />
          <div className="flex flex-col items-center">
            <div className="vacation-main-header border-[3px] border-[#105D8D] w-[100%] mb-4">
              <h1 style={{ color: '#007dba' }} className="font-semibold text-xl">
                HR Documents Status
              </h1>
            </div>
            <Box sx={{ width: '80%', paddingBottom: '20px' }}>
              {/* Requested Documents */}
              <Typography
                variant="h5"
                sx={{ color: '#ffffff', fontWeight: 'bold', fontFamily: '"BPG Rioni", sans-serif', mb: 2 }}
              >
                Requested Documents
              </Typography>
              {requestedDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                    fontFamily: '"BPG Rioni", sans-serif',
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Request Type
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {doc.type}
                    </Typography>
                  </CardContent>
                  <Chip
                    label={doc.status}
                    sx={{
                      backgroundColor: '#00c0a7',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontFamily: '"BPG Rioni", sans-serif',
                    }}
                  />
                </Card>
              ))}

              {/* Approved Documents */}
              <Typography
                variant="h5"
                sx={{ color: '#ffffff', fontWeight: 'bold', fontFamily: '"BPG Rioni", sans-serif', mb: 2 }}
              >
                Approved Documents
              </Typography>
              {approvedDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                    fontFamily: '"BPG Rioni", sans-serif',
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Request Type
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {doc.type}
                    </Typography>
                  </CardContent>
                  <Chip
                    label={doc.status}
                    sx={{
                      backgroundColor: '#00c853',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontFamily: '"BPG Rioni", sans-serif',
                    }}
                  />
                </Card>
              ))}

              {/* Rejected Documents */}
              <Typography
                variant="h5"
                sx={{ color: '#ffffff', fontWeight: 'bold', fontFamily: '"BPG Rioni", sans-serif', mb: 2 }}
              >
                Rejected Documents
              </Typography>
              {rejectedDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                    fontFamily: '"BPG Rioni", sans-serif',
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Request Type
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {doc.type}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ marginTop: '10px' }}>
                      Comment
                    </Typography>
                    <Typography variant="body2">{doc.comment}</Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#ff1744',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      borderRadius: '25px',
                      padding: '10px 20px',
                      fontFamily: '"BPG Rioni", sans-serif',
                    }}
                  >
                    Reject
                  </Button>
                </Card>
              ))}
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentStatusPage;
