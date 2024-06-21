import { Pool, QueryResult } from "pg";

class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({ // TODO: move to env
      user: 'me',
      host: 'localhost',
      database: 'api',
      password: 'password',
      port: 5432,
    })
  }

  async query<T>(queryText: string, params?: any[]): Promise<T[]> {
    const client = await this.pool.connect();

    try {
      const res: QueryResult = await client.query(queryText, params);
      return res.rows;
    } catch (err) {
      console.error('Error executing query', (<Error>err).stack);
      throw err;
    } finally {
      client.release();
    }
  }
}

export const databaseService = new DatabaseService();
