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
- **Render** – Deployment platform (OnRender.com)
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
│   ├── parsers/             # Data parsers 
│   ├── routes/              # Fastify routes
│   ├── utils/
│   │   ├── cache.ts         # Cache manager (with TTL and invalidation)
│   │   ├── logger.ts        # Pino logger config
│   │   └── pgListeners.ts   # Listens to DB NOTIFY and invalidates cache
│   ├── zod/                 # Zod schemas per table
│   ├── main.ts              # Entry point
│   └── server.ts            # Fastify + bootstrap
```

---

## 🧠 How Caching Works

- The backend caches data for read-heavy endpoints like `/experience`, `/education`, etc.
- PostgreSQL triggers (`AFTER INSERT/UPDATE/DELETE`) on each relevant table call a `pg_notify` via the `notify_table_update()` function.
- A dedicated `pg` client listens on the `table_update` channel and invalidates only the cache for that specific table.

Example Trigger:

```sql
CREATE OR REPLACE FUNCTION notify_table_update() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('table_update', TG_TABLE_NAME);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER experience_trigger
AFTER INSERT OR UPDATE OR DELETE ON experience
FOR EACH STATEMENT
EXECUTE FUNCTION notify_table_update();
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
- `GET /skills`
- `GET /biodata`
- `GET /projects (Pending)`
- `GET /health` → simple health check

---

## 🧪 Type Safety

This project is **fully typed** using TypeScript:
- All route handlers, DB access, and schemas are strictly typed.
- Zod is used both for validation and to infer TypeScript types.
- This ensures high reliability during development and at runtime.

---

## 📦 Deployment

- Deploy to [Render](https://render.com) with:
  - PostgreSQL (NeonDB) connected via `DATABASE_URL`
  - PostgreSQL (NeonDB) direct connected via `DATABASE_URL_DIRECT`

---

## 👨‍💻 Author

**Giovanni Marcolla**

---

## 📜 License

MIT
