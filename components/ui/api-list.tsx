"use client";

import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";
import useGetOrigin from "./get-origin";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

const ApiList = ({ entityId, entityName }: ApiListProps) => {
  const params = useParams();
  const origin = useGetOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <ApiAlert
          description={`${baseUrl}/${entityName}`}
          title="GET"
          variant="public"
        />
        <ApiAlert
          description={`${baseUrl}/${entityName}/{${entityId}}`}
          title="GET"
          variant="public"
        />
        <ApiAlert
          description={`${baseUrl}/${entityName}`}
          title="POST"
          variant="admin"
        />
        <ApiAlert
          description={`${baseUrl}/${entityName}/{${entityId}}`}
          title="PATCH"
          variant="admin"
        />
        <ApiAlert
          description={`${baseUrl}/${entityName}/{${entityId}}`}
          title="DELETE"
          variant="admin"
        />
      </div>
    </div>
  );
};

export default ApiList;
