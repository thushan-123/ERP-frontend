"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { update_request } from "../../apiCall";

interface UpdateUomProps {
  id: string;
}

export default function UpdateUom({ id }: UpdateUomProps) {
  const router = useRouter();

  const [uomCode, setUomCode] = useState("");
  const [uomState, setUomState] = useState("");
  const [uomCategory, setUomCategory] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState("");
  const [description, setDescription] = useState("");

  const update = async () => {
    const uomId = Number(id);

    if (!Number.isInteger(uomId) || uomId <= 0) {
      alert("Invalid UOM ID");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Access token not found");
      return;
    }

    try {
      const res = await update_request(
        uomId,
        uomCode,
        uomState,
        uomCategory,
        decimalPlaces,
        description,
        token
      );

      if (res) {
        alert("Update successful");
        router.push("/master");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating");
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <a className="text-sm font-medium text-indigo-600 hover:text-indigo-800" href="/master">← Back to UOM Master</a>
      <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">UOM Master</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Update unit of measure <span className="text-slate-400">#{id}</span></h1>
          <p className="mt-2 text-sm text-slate-500">Edit the record details below.</p>
        </div>
        <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); void update(); }}>
          <label className="space-y-2 text-sm font-medium text-slate-700">UOM code
            <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" value={uomCode} onChange={(e) => setUomCode(e.target.value)} required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">UOM name
            <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" value={uomState} onChange={(e) => setUomState(e.target.value)} required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">UOM category
            <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" value={uomCategory} onChange={(e) => setUomCategory(e.target.value)} required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">Decimal places
            <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" type="number" min="0" value={decimalPlaces} onChange={(e) => setDecimalPlaces(e.target.value)} required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">Description
            <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
            <button className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={() => router.push("/master")}>Cancel</button>
            <button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200" type="submit">Save changes</button>
          </div>
        </form>
      </section>
    </main>
  );
}
