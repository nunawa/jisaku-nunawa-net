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
        "SELECT TOP 30 c.name, c.price, c.sales_rank, c.manufacturer, c.frequency, c.socket, c.core_count, c.thread_count FROM PcParts p JOIN c IN p.cpu",
    };
  } else if (type == "memory") {
    query = {
      query:
        "SELECT TOP 30 c.name, c.price, c.sales_rank, c.manufacturer, c.capacity, c.pcs, c.standard, c.interface FROM PcParts p JOIN c IN p.memory",
    };
  } else if (type == "motherboard") {
    query = {
      query:
        "SELECT TOP 30 c.name, c.price, c.sales_rank, c.manufacturer, c.form_factor, c.socket, c.chipset, c.memory FROM PcParts p JOIN c IN p.motherboard",
    };
  } else if (type == "gpu") {
    query = {
      query:
        "SELECT TOP 30 c.name, c.price, c.sales_rank, c.manufacturer, c.gpu_name, c.bus_interface, c.memory, c.monitor FROM PcParts p JOIN c IN p.gpu",
    };
  } else if (type == "ssd") {
    query = {
      query:
        "SELECT TOP 30 c.name, c.price, c.sales_rank, c.manufacturer, c.capacity, c.cell_type, c.size, c.interface FROM PcParts p JOIN c IN p.ssd",
    };
  } else {
    res.status(500).json({ error: "type param error" });
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
