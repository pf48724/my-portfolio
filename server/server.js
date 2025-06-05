import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const dataFilePath = path.join(__dirname, 'tagPositions.json');

async function initDataFile() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    await fs.writeFile(dataFilePath, JSON.stringify({}), 'utf8');
    console.log('Created tag positions data file');
  }
}

app.get('/api/positions', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading positions:', error);
    res.status(500).json({ error: 'Failed to read positions' });
  }
});

app.post('/api/positions/:tagId', async (req, res) => {
  try {
    const { tagId } = req.params;
    const { position } = req.body;
    
    const data = await fs.readFile(dataFilePath, 'utf8');
    const positions = JSON.parse(data);
    
    positions[tagId] = position;
    
    await fs.writeFile(dataFilePath, JSON.stringify(positions), 'utf8');
    
    res.json({ success: true, tagId, position });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ error: 'Failed to update position' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

initDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to initialize server:', error);
});
