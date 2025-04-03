import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Upload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useImportHistory } from '../context/ImportHistoryContext';

interface CSVData {
  [key: string]: string | number;
}

const ImportData: React.FC = () => {
  const { history, addImport } = useImportHistory();
  const [csvData, setCSVData] = useState<CSVData[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addImport(file);
      
      // Read and parse CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(value => value.trim());
          return headers.reduce((obj: CSVData, header, index) => {
            // Convert numeric values to numbers
            const value = values[index] || '';
            obj[header] = !isNaN(Number(value)) && value !== '' ? Number(value) : value;
            return obj;
          }, {});
        });
        
        console.log('Parsed CSV Data:', data);
        setCSVData(data);
      };
      reader.readAsText(file);
    }
  }, [addImport]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Import Data
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload CSV File
        </Typography>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="csv-upload"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="csv-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
          >
            Choose File
          </Button>
        </label>
      </Paper>

      {csvData.length > 0 && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            CSV Preview
          </Typography>
          <TableContainer sx={{ maxHeight: 400, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(csvData[0]).map((header) => (
                    <TableCell 
                      key={header} 
                      align={typeof csvData[0][header] === 'number' ? 'right' : 'left'}
                      sx={{ 
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #e0e0e0'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((row, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}
                  >
                    {Object.keys(row).map((key) => (
                      <TableCell 
                        key={key} 
                        align={typeof row[key] === 'number' ? 'right' : 'left'}
                        sx={{ 
                          borderBottom: '1px solid #e0e0e0',
                          padding: '8px 16px'
                        }}
                      >
                        {typeof row[key] === 'number' ? row[key].toLocaleString() : row[key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Typography variant="h6" gutterBottom>
        Import History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Filename</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.filename}</TableCell>
                <TableCell>{formatFileSize(item.size)}</TableCell>
                <TableCell>
                  {item.timestamp.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {history.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No import history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ImportData; 