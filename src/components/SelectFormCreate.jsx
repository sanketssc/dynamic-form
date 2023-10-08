import { useState } from "react";
import { useCreateForm, useFormStore, useSubmissionForm } from "../store/store";

export default function SelectFormCreate() {
  const [formFields, setFormFields] = useState({
    formtype: "select",
    options: ["", ""],
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
    let val = false;
    formFields.options.forEach((opt) => {
      if (opt.trim().length === 0) {
        setError("Fill all options or remove empty options");
        val = true;
        return;
      }
    });
    if (new Set(formFields.options).size !== formFields.options.length) {
      setError("Duplicate Options");
      val = true;
    }
    if (val) return;
    setForm(formFields);
    setSubmissionForm({
      [formFields.fieldName]: formFields.options[0],
      isRequired: formFields.isRequired,
    });
    setVal();
  };
  const handleOptionChange = (event, idx) => {
    setFormFields((prev) => {
      const opt = prev.options;
      opt[idx] = event.target.value;
      return { ...prev, options: opt };
    });
    setError("");
  };

  return (
    <div className="select-form">
      <h2>Dropdown</h2>
      <label htmlFor="fieldName">
        <div>Name</div>
        <input
          id="fieldName"
          type="text"
          name="fieldName"
          onChange={handleChange}
        />
      </label>
      {formFields.options.map((opt, idx) => {
        return (
          <div key={`opt-${idx}`}>
            <div>Option {idx + 1}</div>
            <input
              type="text"
              name={`option-${idx}`}
              id={`option-${idx}`}
              value={opt}
              onChange={(e) => handleOptionChange(e, idx)}
            />

            <button
              className="remove-btn"
              onClick={() => {
                if (formFields.options.length < 2) {
                  setError("Minimum 1 option required");
                  return;
                }
                const tmp = formFields.options.filter((val, ind) => {
                  if (ind === idx) {
                    return false;
                  }
                  return true;
                });
                setFormFields((prev) => {
                  return { ...prev, options: tmp };
                });
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
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
      <button
        onClick={() => {
          const tmp = formFields.options;
          tmp.push("");
          setFormFields((prev) => {
            return { ...prev, options: tmp };
          });
        }}
      >
        Add Option
      </button>

      <button onClick={handleClick}>Add To Form</button>
      <p className="error">{error}</p>
    </div>
  );
}
