import { prisma } from "@/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">
            Next.js + Prisma 7 + Neon DB
          </h1>
          <p className="text-foreground/60">
            A modern full-stack setup using Next.js 16, Prisma 7 with the Neon adapter for serverless PostgreSQL.
          </p>
        </div>

        {/* Data Preview Box */}
        <div className="border border-foreground/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Database Preview</h2>
            <span className="text-sm text-foreground/50">
              {users.length} {users.length === 1 ? 'record' : 'records'}
            </span>
          </div>

          {users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border border-foreground/10 rounded-lg p-4 hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-foreground/50 font-mono">ID: {user.id}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-foreground/40">
              <p>No users found</p>
              <p className="text-sm mt-1">Add some data to your database to see it here</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-foreground/40">
          Next.js 16 • Prisma 7 • Neon DB
        </div>
      </div>
    </div>
  );
}
