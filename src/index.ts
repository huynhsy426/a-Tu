import express from 'express';
import imageRoutes from './routes/index';
import File from './file';

const app: express.Application = express();
const port: number = 3005; // Default port

app.set('view engine', 'ejs');
app.set('views', 'views');


// Add routes
app.use(imageRoutes);

// Start server
app.listen(port, async (): Promise<void> => {
  // Make sure that thumb path is available
  await File.createThumbPath();

  const url: string = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Please open ${url} to review the project ...`);
});

export default app;
