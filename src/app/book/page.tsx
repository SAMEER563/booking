// app/book/page.tsx
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-600 text-lg">Loading booking form...</div>}>
      <BookingClient />
    </Suspense>
  );
}
