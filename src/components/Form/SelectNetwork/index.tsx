import Select from "../Select";

export default function SelectNetwork({
  id,
  submit,
  setSubmit,
  validate,
  reset,
  success,
}: any) {
  const network = [
    "Select Network",
    "Tether USD (Tron/TRC20)",
    "Tether USD (Tron/TRC20)",
    "Tether USD (Tron/TRC20)",
  ];

  return (
    <Select
      label="Your Network"
      placeholder="Select Network"
      error="Required field"
      submit={submit}
      setSubmit={setSubmit}
      validate={validate}
      reset={reset}
      data={network}
      id={id}
      success={success}
    />
  );
}
