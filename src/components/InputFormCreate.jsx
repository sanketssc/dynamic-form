import { useState } from "react";
import { useCreateForm, useFormStore, useSubmissionForm } from "../store/store";

export default function InputFormCreate() {
  const [formFields, setFormFields] = useState({
    formtype: "input",
    fieldType: "text",
    isRequired: false,
  });
  const [error, setError] = useState("");
  const { setForm } = useFormStore();
  const { setVal } = useCreateForm();
  const { setSubmissionForm } = useSubmissionForm();

  const handleChange = (e) => {
    setFormFields((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setError("");
  };
  const handleRequiredChange = (e) => {
    setFormFields((prev) => {
      return { ...prev, [e.target.name]: !formFields.isRequired };
    });
    setError("");
  };

  const handleClick = () => {
    if (!formFields.fieldName) {
      setError("Name Field Required");
      return;
    }

    setForm(formFields);
    setSubmissionForm({
      [formFields.fieldName]: "",
      isRequired: formFields.isRequired,
    });

    setVal("");
  };

  return (
    <div className="select-form">
      <h2>Input</h2>
      <label htmlFor="fieldName">
        <div>Name</div>
        <input
          id="fieldName"
          type="text"
          name="fieldName"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="fieldType">
        <div>Input Type</div>

        <select
          name="fieldType"
          id="fieldType"
          onChange={handleChange}
          defaultValue="text"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
        </select>
      </label>
      <label htmlFor="isRequired">
        <div>Required</div>{" "}
        <input
          type="checkbox"
          name="isRequired"
          id="isRequired"
          value={true}
          checked={formFields.isRequired}
          onChange={handleRequiredChange}
        />
      </label>

      <button onClick={handleClick}>Add To Form</button>

      <p className="error">{error}</p>
    </div>
  );
}
