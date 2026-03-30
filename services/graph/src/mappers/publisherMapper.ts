import { Publisher } from "../models/types.js";

export function mapPublisherFromDb(publisher: any): Publisher {
  return {
    publishingCompanyId: publisher.nPublishingCompanyID,
    name: publisher.cName,
  };
}
