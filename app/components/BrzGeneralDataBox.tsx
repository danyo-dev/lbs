import { Addresses, BrzGeneralDataBoxItem, EmailList } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";
import { LbsLoader } from "~/components/shared/LbsLoader";

export default function BrzGeneralDataBox({
  data,
  type,
}: Fetcher<BrzGeneralDataBoxItem>) {
  function renderAddresses(
    { adresse: addresses }: Addresses,
    key: keyof BrzGeneralDataBoxItem
  ) {
    return addresses.map((address, idx) => {
      return (
        <li key={`${key}${idx}`} className="grid grid-cols-3 py-1 px-5">
          <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}${
            idx + 1
          }:`}</div>
          <ul className="ml-2">
            <li>{address.strasse._text}</li>
            <li>{address.plz._text}</li>
            <li>{address.ort._text}</li>
            <li>{address.staat._text}</li>
            <li>{address.typ._text}</li>
          </ul>
        </li>
      );
    });
  }

  function renderEmail({ email }: EmailList, key: keyof BrzGeneralDataBoxItem) {
    return (
      <li key={`${key}`} className="grid grid-cols-3 py-1 px-5">
        <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
        <div>{email.emailadresse._text}</div>
      </li>
    );
  }
  return (
    <LbsLoader type={type} hasData={Boolean(data)}>
      <ul className="text-slate-500 text-sm list">
        {data &&
          Object.entries(data).map(([key, value]) => {
            switch (key) {
              case "adressen":
                return renderAddresses(value, key);
              case "emailliste":
                return renderEmail(value, key);

              default:
                return (
                  <li key={`${key}`} className="grid grid-cols-3 py-1 px-5">
                    <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
                    <div className="px-2">{value._text}</div>
                  </li>
                );
            }
          })}
      </ul>
    </LbsLoader>
  );
}
