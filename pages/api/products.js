import { CosmosClient } from "@azure/cosmos";

export default async function handler(req, res) {
  let query;
  const type = req.query.type;
  if (!type) {
    res.status(500).json({ error: "type param is not set" });
    return;
  } else if (type == "cpu") {
    query = {
      query:
        "SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.frequency, c.socket, c.core_count, c.thread_count FROM PcParts p JOIN c IN p.cpu",
    };
  }

  const key = process.env.COSMOS_KEY;
  const endpoint = process.env.COSMOS_ENDPOINT;
  const client = new CosmosClient({ endpoint, key });
  await client
    .database("Main")
    .container("PcParts")
    .items.query(query)
    .fetchAll()
    .then(({ resources: results }) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "DB server error" });
    });
}
