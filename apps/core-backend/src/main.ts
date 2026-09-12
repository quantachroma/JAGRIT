import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { query } from './db/client';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://localhost:3001'],
	}),
);

app.get('/health', async (_request, response) => {
	try {
		const result = await query('SELECT NOW(), PostGIS_Version();');
		const row = result.rows[0] as {
			now: Date | string;
			postgis_version: string;
		};

		response.json({
			status: 'ok',
			service: 'jagrit-core-backend',
			timestamp: new Date(row.now).toISOString(),
			postgis_version: row.postgis_version,
		});
	} catch (_error) {
		response.status(503).json({
			status: 'error',
			service: 'jagrit-core-backend',
		});
	}
});

app.listen(port, () => {
	console.log(`JAGRIT core backend listening on port ${port}`);
});
