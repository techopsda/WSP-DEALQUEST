import 'swagger-ui-react/swagger-ui.css';
import SwaggerUI from 'swagger-ui-react';

export default function Index() {
  return (
    <div>
      <SwaggerUI url="/api/admin/swagger" />
    </div>
  );
}
