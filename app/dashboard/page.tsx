import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BookmarkList from "@/components/BookmarkList";
import AddBookmarkForm from "@/components/AddBookmarkForm";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Bookmarks
            </h1>
            <p className="text-neutral-400 mt-2">
              Manage and organize your digital life
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">Logged in as</p>
              <p className="text-sm text-neutral-400">{user.email}</p>
            </div>
            <form action="/auth/signout" method="post">
              <button className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/5">
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="space-y-10">
          <section className="max-w-2xl">
            <AddBookmarkForm />
          </section>

          {/* Bookmark List */}
          <section>
            <BookmarkList initialBookmarks={bookmarks ?? []} />
          </section>
        </main>
      </div>
    </div>
  );
}
