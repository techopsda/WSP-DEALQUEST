interface AdminStartupStateProps {
  error?: Error | null;
}

export const AdminStartupState = ({ error }: AdminStartupStateProps) => (
  <main className="flex grow items-center justify-center bg-gray-100 p-8 text-gray-900">
    <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      {error ? (
        <>
          <h1 className="font-heading text-3xl text-error">Unable to load the admin console</h1>
          <p className="mt-4 break-words">{error.message}</p>
          <div className="mt-6 rounded-md bg-gray-100 p-4 text-sm">
            Confirm that the Prisma database connection works and that <code>public</code> and <code>access</code> are
            exposed under Supabase <strong>Integrations → Data API</strong>, then reload this page.
          </div>
          <button className="mt-6 rounded-md bg-nsAdmin-900 px-5 py-3 text-white" onClick={() => location.reload()}>
            Retry
          </button>
        </>
      ) : (
        <>
          <h1 className="font-heading text-3xl">Loading admin console</h1>
          <p className="mt-3 text-gray-600">Loading database resources and permissions…</p>
        </>
      )}
    </div>
  </main>
);
