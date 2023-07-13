import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteRegionRequest,
  GetRegionRequest,
} from "../ReduxSaga/Action/RegionAction";
import FormikSagaRegion from "./FormikSagaRegion";
export default function RegionSagaView() {
  const dispatch = useDispatch();
  const { regions } = useSelector((state) => state.regionState);
  const [display, setDisplay] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    dispatch(GetRegionRequest());
  }, [refresh]);

  const handleUpdate = (region) => {
    setSelectedRegion(region);
    setUpdate(true);
    
  };

  const onDelete = async (id) => {
    dispatch(DeleteRegionRequest(id));
    window.alert("Data successfully deleted");
    setRefresh(true);
    window.location.reload()
  };

  console.log(regions);
  return (
    <div>
      {display ? (
        <FormikSagaRegion
          setDisplay={setDisplay}
          setRefresh={setRefresh}
          region={selectedRegion}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        <>
          <h2>List Regions</h2>
          <button onClick={() => setDisplay(true)}>Add Region</button>
          <table>
            <thead>
              <tr>
                <th>Region ID</th>
                <th>Region Name</th>
                <th>Photo name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {regions &&
                regions.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>{reg.photo}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleUpdate(reg);
                          setDisplay(true);
                        }}
                      >
                        Update
                      </button>
                      <button onClick={() => onDelete(reg.regionId)}>Delete</button>
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
