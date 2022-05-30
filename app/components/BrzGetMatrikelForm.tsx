import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { FormProps } from 'remix';
import { StateTypes } from '~/types/generalTypes';
import { CompleteStudentProfile } from '~/types/studentTypes';
import { formatBirthdates } from '~/utils/dateUtils';
import { InputField } from './InputField';

interface Props {
  Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;
  state: StateTypes;
  student: CompleteStudentProfile | undefined;
}
export default function BrzGetMatrikelForm({ Form, state, student }: Props) {
  const { stammDaten } = student || {};
  return (
    <Form method="get" action="/admin/api/brz/getMatrikel" className=" bg-white overflow-hidden rounded-lg p-3">
      <div className="px-6 py-3 bg-white overflow-hidden ">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <InputField
              name="vorname"
              label="vorname"
              value={stammDaten?.vorname || ''}
              required
              className="inputField"
            />
          </div>

          <div className="col-span-6">
            <InputField
              name="nachname"
              label="nachname"
              value={stammDaten?.name || ''}
              required
              className="inputField"
            />
          </div>

          <div className="col-span-6">
            <InputField
              name="geburtsdatum"
              inputType="date"
              label="geburtsdatum"
              value={formatBirthdates(stammDaten?.geb) || ''}
              required
              className="inputField"
            />
          </div>
          <div className="col-span-6">
            <InputField name="svnr" label="svnr" value="" className="inputField" />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          disabled={state === 'submitting' ? true : false}
          type="submit"
          className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent  text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Abfragen
        </button>
      </div>
    </Form>
  );
}
