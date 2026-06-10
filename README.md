# VIBsl Assignment Project Workspace

A comprehensive project management and assignment submission dashboard interface tracking workflow allocations and administrative status states.

---

## Technical Stack Architecture

* **Framework:** Next.js 15.1.0 (App Router Paradigm)
* **Database Engine:** MongoDB via Prisma ORM 6.19.3
* **State Management:** Zustand 5.0.3
* **Style Engine:** Tailwind CSS 4.0.0 with PostCSS 4.0.0
* **Development Paradigm:** TypeScript 5.7.2

---

## Getting Started

### 1. Repository Instantiation

Clone the project assets to your local machine storage volume:

```bash
git clone https://github.com/your-username/vibsl-assignment.git
cd vibsl-assignment

```

### 2. Dependency Resolution

Install the unified module manifest tracking definitions matching the version constraints locked in your engine registry:

```bash
npm install

```

### 3. Environment Variable Provisioning

Create a `.env` configuration file inside your project root directory:

```bash
touch .env

```

Open the file and map your specific connection parameter string matching your MongoDB cluster instance target:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.<id>.mongodb.net/<database_name>?retryWrites=true&w=majority"

```

### 4. Database Client Compilation

Compile your declarative object relational definitions inside `prisma/schema.prisma` directly into your native node modules runtime path:

```bash
npx prisma generate

```

### 5. Local Runtime Execution

Fire up the local optimization development compiler engine server layer:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) inside your web browser engine interface view.

---

## Production Compilation and Deployment Pipelines

### Local Build Simulation

To execute a local simulation pass to guarantee the type checker loops complete successfully without dropping runtime structures:

```bash
npm run build

```

### Serverless Vercel Architecture Engine Setup

When establishing your automated production pipeline tracker on Vercel, guarantee these deployment infrastructure configuration properties are met:

* **Environment Key Mapping:** Add your active `DATABASE_URL` runtime identifier mapping explicitly inside your project configuration settings page.
* **Build Settings:** Ensure custom overrides are switched off. The project repository engine will execute natively using your structured manifest command sequence configured inside `package.json`:

```bash
prisma generate && next build

```