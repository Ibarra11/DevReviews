import mysql from "serverless-mysql";

export const connection = mysql({
  config: {
    host: process.env.DATABASE_HOST,
    port: 3306,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
});
``;

export async function db({ query, values }: { query: string; values?: any[] }) {
  try {
    const results = await connection.query(query, values);
    await connection.end();
    return results;
  } catch (error) {
    return { error };
  }
}
