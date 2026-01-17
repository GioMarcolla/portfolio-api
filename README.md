## Fastify Backend

A robust and fully typed backend server built with modern tools and best practices. This project leverages Fastify for performance, Drizzle ORM for type-safe PostgreSQL access (via Neon), and a custom in-memory cache layer with automatic invalidation on table updates. Fully written in **TypeScript** with schema validation using **Zod**.

---

## 🚀 Tech Stack

- **Fastify** – High-performance HTTP framework
- **Drizzle ORM** – Type-safe, lightweight ORM for PostgreSQL
- **Neon** – Serverless PostgreSQL with WebSocket and trigger support
- **Zod** – Type-safe schema validation
- **Pino** – Structured logging with pretty formatting in development
- **TypeScript** – Full static typing across the project
- **Vercel** – Serverless Deployment platform (vercel.com)
- **In-memory cache** – Custom cache layer with fine-grained invalidation

---

## ✨ Features

- ✅ Fully typed backend (end-to-end TypeScript)
- ✅ In-memory caching of route data (6h default TTL)
- ✅ Automatic cache invalidation when DB tables change
- ✅ PostgreSQL triggers notify cache layer
- ✅ REST API using Fastify with route schemas powered by Zod
- ✅ Logging via Pino (pretty logs in dev mode)
- ✅ Deploy-ready configuration for Render.com
- ✅ Modular route and schema architecture

---

## 📁 Project Structure

```bash
.
├── src/
│   ├── db/                  # Drizzle + table exports
│   ├── hooks/               # Fasitfy hooks
│   ├── parsers/             # Data parsers 
│   ├── routes/              # Fastify routes
│   ├── utils/
│   │   ├── cache.ts         # Cache manager (with TTL and invalidation)
│   │   ├── logger.ts        # Pino logger config
│   │   └── fastifyUtils.ts  # Utils to clean up and organize server creation
│   ├── zod/                 # Zod schemas per table
│   ├── main.ts              # Entry point
│   └── server.ts            # Fastify + bootstrap
```

---

## 🧠 How Caching Works

- The backend caches data for read-heavy endpoints like `/experience`, `/education`, etc.
- PostgreSQL triggers (`AFTER INSERT/UPDATE/DELETE`) on each relevant table call the `notify_table_update()` function.
- Instead of just sending notifications, `notify_table_update()` appends the updated table name (if not already present) to the `tables_updated` column and updates the `updated_at` timestamp in a singleton row of a dedicated `db_status` table.
- A dedicated PostgreSQL client listens on the `table_update` notification channel but mainly relies on the `db_status` table to determine which tables have changed since last cache invalidation.
- On every request, the backend checks the `db_status` table's `updated_at` timestamp and invalidates cache entries for all tables listed in `tables_updated`. After invalidation, the `tables_updated` column is cleared.

Example Trigger Function:

```sql
CREATE OR REPLACE FUNCTION notify_table_update() RETURNS trigger AS $$
BEGIN
  UPDATE db_status SET
    tables_updated = CASE
      WHEN tables_updated IS NULL THEN TG_TABLE_NAME
      WHEN tables_updated = '' THEN TG_TABLE_NAME
      WHEN (',' || tables_updated || ',') NOT LIKE '%,' || TG_TABLE_NAME || ',%' THEN tables_updated || ',' || TG_TABLE_NAME
      ELSE tables_updated
    END,
    updated_at = NOW()
  WHERE id = '7b5fe238-c031-4caa-b28d-f635f310d949'; -- Singleton row ID

  PERFORM pg_notify('table_update', TG_TABLE_NAME);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS experience_table_update_trigger ON experience;

CREATE TRIGGER experience_table_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON experience
FOR EACH STATEMENT
EXECUTE FUNCTION notify_table_update();

...
```

---

## 🛠 Setup

1. **Install dependencies**  
   ```bash
   bun install
   or
   npm install
   ```

2. **Configure `.env`**

   ```env
   DATABASE_URL=your-neon-postgres-url
   DATABASE_URL_DIRECT=your-neon-postgres-url_direct (no pooling). Used for listeners.
   NODE_ENV=development || porduction
   PINO_LOG_LEVEL=debug || production
   PORT=3001
   API_KEY=your-api-key
   ALLOWED_ORIGINS=string of allowed origins separeted by a comma(,)
   ```

3. **Generate DB types**  
   ```bash
   bun run db:generate
   or
   npm run db:generate
   ```

4. **Migrate DB**  
   ```bash
   bun run db:migrate
   or
   npm run db:migrate
   ```

5. **Start dev server**
   ```bash
   bun run start
   or
   npm run start
   ```

6. **Production build**
   ```bash
   bun run build
   or
   npm run build
   ```

---

## ✅ Example Endpoints

- `GET /experience`
- `GET /education`
- `GET /skills (pending)`
- `GET /biodata`
- `GET /projects`
- `GET /events (pending)`
- `GET /certifications (pending)`
- `GET /health` → simple health check

---

## 🧪 Type Safety

This project is **fully typed** using TypeScript:
- All route handlers, DB access, and schemas are strictly typed.
- Zod is used both for validation and to infer TypeScript types.
- This ensures high reliability during development and at runtime.

---

## 📦 Deployment

- Deploy to [Vercel](https://vercel.com) with:
  - PostgreSQL (NeonDB) connected via `DATABASE_URL`
  - PostgreSQL (NeonDB) direct connected via `DATABASE_URL_DIRECT`

---

## 👨‍💻 Author

**Giovanni Marcolla**

---

## 📜 License

MIT
