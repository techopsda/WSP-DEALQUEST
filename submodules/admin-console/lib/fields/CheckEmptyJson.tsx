import { JsonField } from 'react-admin-json-view';
import { useRecordContext } from 'react-admin';

const NullableJSONField: any = ({ source }: any) => {
  const record = useRecordContext();
  const fieldValue = record[source];

  if (fieldValue === null || fieldValue === '') {
    return ' ';
  }

  return <JsonField source={source} reactJsonOptions={{ name: source, collapsed: true }} />;
};

export default NullableJSONField;
