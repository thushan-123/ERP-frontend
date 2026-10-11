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
    <div>
      <h1>Update UOM ID: {id}</h1>

      <label>UOM Code: </label>
      <input
        type="text"
        value={uomCode}
        onChange={(e) => setUomCode(e.target.value)}
      />
      <br />

      <label>UOM Name: </label>
      <input
        type="text"
        value={uomState}
        onChange={(e) => setUomState(e.target.value)}
      />
      <br />

      <label>UOM Category: </label>
      <input
        type="text"
        value={uomCategory}
        onChange={(e) => setUomCategory(e.target.value)}
      />
      <br />

      <label>Decimal Places: </label>
      <input
        type="number"
        value={decimalPlaces}
        onChange={(e) => setDecimalPlaces(e.target.value)}
      />
      <br />

      <label>Description: </label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <button type="button" onClick={update}>
        Update UOM
      </button>
    </div>
  );
}