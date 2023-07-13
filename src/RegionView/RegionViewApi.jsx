import React, { useEffect, useState } from "react";
import RegionApi from "../api/RegionApi";
import RegionCreate from "./RegionCreate";

export default function RegionViewApi() {
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    RegionApi.list().then((data) => {
      setRegion(data);
    });
    setRefresh(false);
  }, [refresh]);
  const onDelete = async (id) => {
    RegionApi.deleted(id).then(() => {
      window.alert("Data successfully deleted");
      setRefresh(true);
    });
  };
  return (
    <div>
      {display ? (
        <RegionCreate setRefresh={setRefresh} setDisplay={setDisplay} />
      ) : (
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Regions</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {region &&
                region.map((reg) => (
                  <tr key={reg.region_id}>
                    <td>{reg.region_id}</td>
                    <td>{reg.region_name}</td>
                    <td>
                      <button onClick={() => onDelete(reg.region_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
