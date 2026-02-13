"use client";

import { useActionState, useEffect } from "react";
import { addBookmark } from "@/app/actions";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  error: "",
};

export default function AddBookmarkForm() {
  // @ts-expect-error - overload signature mismatch in react types
  const [state, formAction, isPending] = useActionState(
    addBookmark,
    initialState,
  );

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          name="url"
          type="url"
          placeholder="Paste a URL (https://...)"
          required
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-500"
        />
        <input
          name="title"
          type="text"
          placeholder="Title (optional)"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-neutral-500 hidden md:block"
        />
        <button
          disabled={isPending}
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          <span>Add</span>
        </button>
      </div>
    </form>
  );
}
