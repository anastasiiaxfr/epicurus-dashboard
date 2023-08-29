import Select from "../Select";

export default function SelectPeriod({
  id,
  success,
  submit,
  setSubmit,
  validate,
  reset
}: any) {
  const period = ["Choose Period", "1 Month", "3 Month", "12 Month"];

  return (
    <Select
      label="Your Period"
      placeholder="Choose Period"
      error="Required field"
      submit={submit}
      setSubmit={setSubmit}
      validate={validate}
      reset={reset}
      data={period}
      id={id}
      success={success}
    />
  );
}
