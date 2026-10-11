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
    <main style={{ padding: "24px" }}>
      <h1>UOM Master</h1>

      <button type="button" onClick={nav_create}>Create New UOM</button>

      <button type="button" onClick={logout}>LogOut</button>

      {loading && <p>Loading UOM data...</p>}

      {!loading && error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {!loading && !error && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>UOM ID</th>
              <th style={cellStyle}>UOM Name</th>
              <th style={cellStyle}>UOM Code</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Edit</th>
            </tr>
          </thead>

          <tbody>
            {dataList.length > 0 ? (
              dataList.map((item) => (
                <tr key={item.uom_id}>
                  <td style={cellStyle}>{item.uom_id}</td>
                  <td style={cellStyle}>{item.uom_name}</td>
                  <td style={cellStyle}>{item.uom_code}</td>
                  <td style={cellStyle}>
                    {item.description ?? "-"}
                  </td>
                  <td style={cellStyle}> {item.active ? "Active" : "Inactive"} </td>
                  <td style={cellStyle}>
                    <button
                        type="button"
                        onClick={() => nav_update(item.uom_id)}
                    >
                        Edit
                    </button>
                    </td>
                  {/* <td style={cellStyle}> <button type="button" onClick={() => nav_update(item.uom_id.toString)}>Edit</button> </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={cellStyle}>
                  No UOM records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};