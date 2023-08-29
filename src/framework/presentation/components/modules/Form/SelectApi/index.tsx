import { useContext } from "react";
import Link from "next/link";
import Select from "../Select";
import { ProductContext } from "../../../../../../pages/_products";

export default function SelectApi({
  id,
  success,
  submit,
  setSubmit,
  validate,
  reset
}: any) {

  const { newApiKey }: any = useContext(ProductContext);

  const period = ["Choose API Key"];
  if(newApiKey.length !== 0){
    period.push(...newApiKey.map((apiKey: any) => ({ id: apiKey.id, name: apiKey.api_name })));
  }

  return (
    <Select
      label="Your API Key"
      placeholder="Choose API Key"
      error="Required field"
      submit={submit}
      setSubmit={setSubmit}
      validate={validate}
      reset={reset}
      data={period}
      id={id}
      success={success}
    >
      No API Keys? <Link href="/myapi">Add a new one</Link>
    </Select>
  );
}
