"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { deleteBookmark } from "@/app/actions";
import { Trash2, ExternalLink, Pencil, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import EditBookmarkModal from "./EditBookmarkModal";

type Bookmark = {
  id: string;
  title: string | null;
  url: string;
  created_at: string;
};

export default function BookmarkList({
  initialBookmarks,
}: {
  initialBookmarks: Bookmark[];
}) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((current) => [payload.new as Bookmark, ...current]);
          } else if (payload.eventType === "DELETE") {
            setBookmarks((current) =>
              current.filter((b) => b.id !== payload.old.id),
            );
          } else if (payload.eventType === "UPDATE") {
            setBookmarks((current) =>
              current.map((b) =>
                b.id === payload.new.id ? (payload.new as Bookmark) : b,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      bookmark.title?.toLowerCase().includes(searchLower) ||
      bookmark.url.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="mb-8">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookmarks by title or URL..."
            className="block w-full pl-10 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-20 text-neutral-500 border border-white/10 rounded-2xl bg-white/5 border-dashed"
            >
              <p>
                {searchQuery
                  ? "No matching bookmarks found."
                  : "No bookmarks yet. Add one above!"}
              </p>
            </motion.div>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={bookmark.id}
                className="group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 overflow-hidden">
                    <h3
                      className="font-medium text-white truncate text-lg"
                      title={bookmark.title || bookmark.url}
                    >
                      {bookmark.title || new URL(bookmark.url).hostname}
                    </h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 hover:text-white truncate flex items-center gap-1 transition-colors"
                    >
                      <span>{new URL(bookmark.url).hostname}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        console.log("Edit clicked", bookmark);
                        setEditingBookmark(bookmark);
                      }}
                      className="p-2 text-neutral-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit bookmark"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        const result = await deleteBookmark(bookmark.id);
                        if (result.error) {
                          toast.error(result.error);
                        } else {
                          toast.success("Bookmark deleted");
                        }
                      }}
                      className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      {editingBookmark && (
        <EditBookmarkModal
          bookmark={editingBookmark}
          onClose={() => setEditingBookmark(null)}
        />
      )}
    </>
  );
}
