"use client";

import { useActionState, useEffect } from "react";
import { updateBookmark } from "@/app/actions";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Bookmark = {
  id: string;
  title: string | null;
  url: string;
};

const initialState = {
  success: false,
  message: "",
  error: "",
};

export default function EditBookmarkModal({
  bookmark,
  onClose,
}: {
  bookmark: Bookmark;
  onClose: () => void;
}) {
  // @ts-expect-error - overload signature mismatch in react types
  const [state, formAction, isPending] = useActionState(
    updateBookmark,
    initialState,
  );

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.message);
      onClose();
    }
  }, [state, onClose, bookmark]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Edit Bookmark</h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={bookmark.id} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">URL</label>
            <input
              name="url"
              type="url"
              defaultValue={bookmark.url}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">
              Title (optional)
            </label>
            <input
              name="title"
              type="text"
              defaultValue={bookmark.title || ""}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
