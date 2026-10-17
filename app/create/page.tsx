"use client";
import { useState } from "react";
import { create_request } from "../apiCall";
import { useRouter } from "next/navigation";

export default function CreateUOM () {

    const router = useRouter()

    const [uomCode, setUomCode] = useState("")
    const [uomState, setUomState] = useState("")
    const [uomCategory, setUomCategory] = useState("")
    const [decimalPlaces, setDecimalPlaces] = useState("")
    const [description, setDescription] = useState("")

    const create = async () => {
        const token = localStorage.getItem("token")
        if (token){
            const res = await create_request(uomCode,uomState,uomCategory,decimalPlaces,description,token)
            if (res){
                alert("Create Successfull")
                router.push("/master")
            }else {
                alert("Create Fail")
            }
        }else{
            console.log("token fetch fail")
            alert("token fetch fail")
            return
        }
        
    }

// {
//   "uom_code": "string",
//   "uom_name": "string",
//   "uom_category": "string",
//   "decimal_places": 0,
//   "description": "string",
//   "active": true
// }
    const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <a className="text-sm font-medium text-indigo-600 hover:text-indigo-800" href="/master">← Back to UOM Master</a>
            <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">UOM Master</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Create a unit of measure</h1>
                    <p className="mt-2 text-sm text-slate-500">Enter the details for the new UOM record.</p>
                </div>
                <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); void create(); }}>
                    <label className="space-y-2 text-sm font-medium text-slate-700">UOM code
                        <input className={inputClass} value={uomCode} onChange={(e) => setUomCode(e.target.value)} required />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">UOM name
                        <input className={inputClass} value={uomState} onChange={(e) => setUomState(e.target.value)} required />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">UOM category
                        <input className={inputClass} value={uomCategory} onChange={(e) => setUomCategory(e.target.value)} required />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700">Decimal places
                        <input className={inputClass} type="number" min="0" value={decimalPlaces} onChange={(e) => setDecimalPlaces(e.target.value)} required />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">Description
                        <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
                        <button className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={() => router.push("/master")}>Cancel</button>
                        <button className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200" type="submit">Create UOM</button>
                    </div>
                </form>
            </section>
        </main>
    );
}
