import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  AddRegionRequest,
  UpdateRegionRequest,
} from "../ReduxSaga/Action/RegionAction";

export default function FormikSagaRegion(props) {
  const dispatch = useDispatch();
  const [previewImg, setPreviewImage] = useState();
  const [upload, setUpload] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: undefined,
      file: undefined,
    },
    onSubmit: async (values) => {
      let payload = new FormData();
      payload.append("name", values.name);
      payload.append("file", values.file);
      dispatch(AddRegionRequest(payload));
      props.setDisplay(false);
      window.alert("Data Successfully Insert");
      props.setRefresh(true);
    },
  });

  const handleUpdate = useFormik({
    initialValues: {
      name: undefined,
      file: undefined
    },
    onSubmit: async (values) => {
      let payload = new FormData();
      let id = props.region.regionId;
      // payload.append("id", id);
      payload.append("name", values.name);
      payload.append("file", values.file);
      dispatch(UpdateRegionRequest(id, payload));
      props.setDisplay(false);
      window.alert("Data Successfully Updated");
      props.setRefresh(true);
      props.setUpdate(false);
    },
  });
  const uploadConfig = (name) => (event) => {
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      props.update ? handleUpdate.setFieldValue("file", file) : formik.setFieldValue("file", file);
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setUpload(true);
  };
  const onClear = (event) => {
    event.preventDefault();
    setPreviewImage();
    setUpload(false);
  };
  return (
    <div>
      <div>
        <label>Region Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={props.update ? handleUpdate.values.name : formik.values.name}
          onChange={props.update ? handleUpdate.handleChange : formik.handleChange}
        ></input>
      </div>
      <div>
        <label>Photo</label>
        <div>
          {upload === false ? (
            <>
              <span>Kosong</span>
            </>
          ) : (
            <>
              <img src={previewImg} alt="img"></img>
              <span onClick={onClear}>Remove</span>
            </>
          )}
        </div>
        <div>
          <label>
            <span>upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              onChange={uploadConfig("file")}
            ></input>
          </label>
        </div>
        <div>
          {props.update ? (
            <button type="submit" onClick={handleUpdate.handleSubmit}>
              Update
            </button>
          ) : (
            <button type="submit" onClick={formik.handleSubmit}>
              Simpan
            </button>
          )}
          {/* <button type="submit" onClick={formik.handleSubmit}>
            Simpan
          </button> */}
          <button
            type="submit"
            onClick={() => {
              props.setDisplay(false);
              props.setUpdate(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
