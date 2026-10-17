"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get_data } from "../apiCall";

interface UOM {
  uom_id: number;
  uom_name: string;
  uom_code: string;
  description?: string;
  active: boolean
}

export default function MasterPage() {
  const [dataList, setDataList] = useState<UOM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const nav_create = () => {
    router.push("/create")
  }

 const nav_update = (uom_id: number) => {
  router.push(`/update/${uom_id}`);
};

    const logout = () => {
        localStorage.removeItem("token")
        router.push("/")
    }
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        setError("Access token not found. Please log in.");
        setLoading(false);
        router.push("/");
        return;
      }

      try {
        const response = await get_data(accessToken);

        if (response === null) {
          setError("Failed to fetch UOM data.");
          return;
        }

        const records = Array.isArray(response)
          ? response
          : response.data;

        if (Array.isArray(records)) {
          setDataList(records);
        } else {
          setError("Unexpected API response format.");
          console.error("API response:", response);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">ERP workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">UOM Master</h1>
          <p className="mt-2 text-slate-500">Manage units of measure and their status.</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200" type="button" onClick={nav_create}>Create UOM</button>
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={logout}>Log out</button>
        </div>
      </header>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading && <div className="p-8 text-sm text-slate-500">Loading UOM data...</div>}
        {!loading && error && <div className="m-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">UOM ID</th>
                  <th className="px-5 py-4 font-semibold">UOM Name</th>
                  <th className="px-5 py-4 font-semibold">UOM Code</th>
                  <th className="px-5 py-4 font-semibold">Description</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataList.length > 0 ? dataList.map((item) => (
                  <tr className="transition hover:bg-slate-50" key={item.uom_id}>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">{item.uom_id}</td>
                    <td className="px-5 py-4 text-slate-700">{item.uom_name}</td>
                    <td className="px-5 py-4 font-mono text-slate-600">{item.uom_code}</td>
                    <td className="max-w-sm truncate px-5 py-4 text-slate-500">{item.description ?? "-"}</td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{item.active ? "Active" : "Inactive"}</span></td>
                    <td className="px-5 py-4"><button className="font-semibold text-indigo-600 hover:text-indigo-800" type="button" onClick={() => nav_update(item.uom_id)}>Edit</button></td>
                  </tr>
                )) : (
                  <tr><td className="px-5 py-12 text-center text-slate-500" colSpan={6}>No UOM records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
