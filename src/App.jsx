import "./App.css";

import { useCreateForm, useFormStore, useSubmissionForm } from "./store/store";
import FormFieldInput from "./components/FormFieldInput";
import React from "react";

function App() {
  const { form, setFreshForm } = useFormStore();
  const { value, setVal } = useCreateForm();
  const {
    submissionForm,
    setSubmissionForm,
    clearSubmissionForm,
    setFreshSubmissionForm,
  } = useSubmissionForm();
  const [error, setError] = React.useState("");
  const [submitState, setSubmitState] = React.useState("");
  if (value) {
    return <FormFieldInput />;
  }
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(form)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (submissionForm.length === 0) {
      setError("Add atleast one field");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    let v = false;
    form.forEach((ff, idx) => {
      if (idx === 0) return;
      if (ff.isRequired) {
        if (submissionForm[idx - 1][ff.fieldName].length === 0) {
          setError(`${ff.fieldName} is Required`);
          v = true;
          return;
        }
      }
    });
    if (v) return;
    setSubmitState("Form submitted successfully");
    clearSubmissionForm();
    form.forEach((ff, idx) => {
      if (idx === 0) return;
      if (ff.formtype === "checkbox") {
        setSubmissionForm({
          [ff.fieldName]: [],
          isRequired: ff.isRequired,
        });
      } else {
        setSubmissionForm({
          [ff.fieldName]: "",
          isRequired: ff.isRequired,
        });
      }
    });

    setTimeout(() => {
      setSubmitState("");
    }, 5000);
  };

  return (
    <div className="home">
      {/* {JSON.stringify(form)} */}
      <div className="head">
        <button onClick={exportData}>Download</button>
        <label htmlFor="import" className="button">
          Import
          <input
            style={{ display: "none" }}
            type="file"
            name="import"
            id="import"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files[0];
              const fileReader = new FileReader();
              fileReader.onload = async (event) => {
                const res = JSON.parse(event.target.result);
                if (Array.isArray(res)) {
                  if (res[0]["x-identifier"] === "Dynamic-form") {
                    res.forEach((ff, idx) => {
                      if (idx === 0) return;
                      if (ff.formtype === "checkbox") {
                        setSubmissionForm({
                          [ff.fieldName]: [],
                          isRequired: ff.isRequired,
                        });
                      } else {
                        setSubmissionForm({
                          [ff.fieldName]: "",
                          isRequired: ff.isRequired,
                        });
                      }
                    });

                    setFreshForm(res);
                  }
                }
              };

              fileReader.readAsText(file);
            }}
          />
        </label>
      </div>

      <form className="home-form " onSubmit={(e) => e.preventDefault()}>
        {submitState && <h3 className="success">{submitState}</h3>}
        <h2>Form</h2>
        {form.map((ff, idx) => {
          if (idx === 0) return <React.Fragment key="-1"></React.Fragment>;
          return (
            <div key={idx}>
              {/* {JSON.stringify(ff)} */}
              {ff.formtype === "input" && (
                <label htmlFor={`item-${idx}`}>
                  <div>
                    {ff.fieldName}
                    <span style={{ color: "red" }}>
                      {ff.isRequired ? "*" : ""}
                    </span>
                  </div>
                  <input
                    id={`item-${idx}`}
                    type={ff.fieldType}
                    name={ff.fieldName}
                    value={submissionForm[idx - 1][ff.fieldName]}
                    onChange={(e) => {
                      const tmp = submissionForm;
                      tmp[idx - 1][ff.fieldName] = e.target.value;
                      setFreshSubmissionForm(tmp);
                      setError("");
                    }}
                  />
                </label>
              )}
              {ff.formtype === "textarea" && (
                <label htmlFor={`item-${idx}`}>
                  <div>
                    {ff.fieldName}
                    <span style={{ color: "red" }}>
                      {ff.isRequired ? "*" : ""}
                    </span>
                  </div>
                  <textarea
                    id={`item-${idx}`}
                    name={ff.fieldName}
                    value={submissionForm[idx - 1][ff.fieldName]}
                    onChange={(e) => {
                      const tmp = submissionForm;
                      tmp[idx - 1][ff.fieldName] = e.target.value;
                      setFreshSubmissionForm(tmp);
                      setError("");
                    }}
                  />
                </label>
              )}
              {ff.formtype === "select" && (
                <label htmlFor={`item-${idx}`}>
                  <div>
                    {ff.fieldName}
                    <span style={{ color: "red" }}>
                      {ff.isRequired ? "*" : ""}
                    </span>
                  </div>
                  <select
                    id={`item-${idx}`}
                    name={ff.fieldName}
                    value={submissionForm[idx - 1][ff.fieldName]}
                    onChange={(e) => {
                      const tmp = submissionForm;
                      tmp[idx - 1][ff.fieldName] = e.target.value;
                      setFreshSubmissionForm(tmp);
                      setError("");
                    }}
                  >
                    {ff.options.map((opt, key) => {
                      return (
                        <option key={key} value={opt}>
                          {opt}
                        </option>
                      );
                    })}
                  </select>
                </label>
              )}
              {ff.formtype === "radio" && (
                <>
                  <div>
                    {ff.fieldName}
                    <span style={{ color: "red" }}>
                      {ff.isRequired ? "*" : ""}
                    </span>
                  </div>
                  <div className="options">
                    {ff.options.map((opt, key) => {
                      return (
                        <label
                          htmlFor={`item-${idx}-${key}`}
                          key={`item-${idx}-${key}`}
                        >
                          <input
                            type={ff.fieldType}
                            name={ff.fieldName}
                            id={`item-${idx}-${key}`}
                            checked={
                              submissionForm[idx - 1][ff.fieldName] === opt
                            }
                            onChange={(e) => {
                              const tmp = submissionForm;

                              if (e.target.checked) {
                                tmp[idx - 1][ff.fieldName] = opt;
                              } else {
                                tmp[idx - 1][ff.fieldName] = "";
                              }
                              setFreshSubmissionForm(tmp);
                              setError("");
                            }}
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
              {ff.formtype === "checkbox" && (
                <>
                  <div>
                    {ff.fieldName}
                    <span style={{ color: "red" }}>
                      {ff.isRequired ? "*" : ""}
                    </span>
                  </div>
                  <div className="options">
                    {ff.options.map((opt, key) => {
                      return (
                        <label
                          htmlFor={`item-${idx}-${key}`}
                          key={`item-${idx}-${key}`}
                        >
                          <input
                            type={ff.fieldType}
                            name={ff.fieldName}
                            id={`item-${idx}-${key}`}
                            checked={submissionForm[idx - 1][
                              ff.fieldName
                            ].includes(opt)}
                            onChange={(e) => {
                              const tmp = submissionForm;
                              if (e.target.checked) {
                                tmp[idx - 1][ff.fieldName].push(opt);
                              } else {
                                tmp[idx - 1][ff.fieldName] = tmp[idx - 1][
                                  ff.fieldName
                                ].filter((val) => val !== opt);
                              }
                              setFreshSubmissionForm(tmp);
                              setError("");
                            }}
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
              <button
                className="remove-btn"
                onClick={() => {
                  const tmp = form.filter((val, ind) => {
                    if (ind === idx) {
                      return false;
                    }
                    return true;
                  });
                  const tmp2 = submissionForm.filter((val, ind) => {
                    if (ind === idx - 1) {
                      return false;
                    }
                    return true;
                  });
                  setFreshSubmissionForm(tmp2);
                  setFreshForm(tmp);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </form>
      <div className="error">{error}</div>
      <div className="head">
        <button onClick={() => setVal()}>Add Field</button>
        <button onClick={handleFormSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
