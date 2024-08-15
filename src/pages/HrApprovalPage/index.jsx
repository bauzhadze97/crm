import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile/index';
import Navigation from '../../components/Navigation';

const HrApprovalPage = () => {
  // Sample data for the requests
  const requests = [
    {
      id: 1,
      type: 'Document of Salary',
      name: 'Sophio Kobaidze',
      department: 'IT',
    },
    {
      id: 2,
      type: 'Document of Salary',
      name: 'Sophio Kobaidze',
      department: 'IT',
    },
  ];

  const handleApprove = (id) => {
    // Logic to approve the request
    alert(`Approved request with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Logic to reject the request
    alert(`Rejected request with ID: ${id}`);
  };

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
                Requested Documents
              </h1>
            </div>
            <Box sx={{ width: '80%', paddingBottom: '20px' }}>
              {/* Request Cards */}
              {requests.map((request) => (
                <Card
                  key={request.id}
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
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Request Type
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {request.type}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Name/Surname
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {request.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="textSecondary">
                          Department
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#009FE3' }}>
                          {request.department}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#00c853', color: '#ffffff', fontWeight: 'bold', borderRadius: '25px' }}
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#ff1744', color: '#ffffff', fontWeight: 'bold', borderRadius: '25px' }}
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HrApprovalPage;
