import { useState } from "react";
import { useCreateForm } from "../store/store";
import InputFormCreate from "./InputFormCreate";
import TextAreaFormCreate from "./TextAreaFormCreate";
import RadioFormCreate from "./RadioFormCreate";
import SelectFormCreate from "./SelectFormCreate";
import CheckBoxFormCreate from "./CheckBoxFormCreate";

export default function FormFieldInput() {
  const { setVal } = useCreateForm();
  const [formType, setFormType] = useState("input");
  return (
    <div className="home">
      <div className="head">
        <select onChange={(e) => setFormType(e.target.value)} value={formType}>
          <option value="input">Input</option>
          <option value="textarea">TextArea</option>
          <option value="select">DropDown</option>
          <option value="checkbox">CheckBox</option>
          <option value="radio">Radio</option>
        </select>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        {formType === "input" && <InputFormCreate />}
        {formType === "textarea" && <TextAreaFormCreate />}
        {formType === "select" && <SelectFormCreate />}
        {formType === "checkbox" && <CheckBoxFormCreate />}
        {formType === "radio" && <RadioFormCreate />}
      </form>
      <button onClick={() => setVal()}>Cancel</button>
    </div>
  );
}
