import { CosmosClient } from "@cfworker/cosmos";

export default async function handler(req) {
  let query;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  if (!type) {
    return new Response(
      JSON.stringify({
        error: "type param is not set",
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } else if (type == "cpu") {
    query = `SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.frequency, c.socket, c.core_count, c.thread_count FROM ROOT p JOIN c IN p.cpu`;
  } else if (type == "memory") {
    query = `SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.capacity, c.pcs, c.standard, c.interface FROM PcParts p JOIN c IN p.memory`;
  } else if (type == "motherboard") {
    query = `SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.form_factor, c.socket, c.chipset, c.memory FROM PcParts p JOIN c IN p.motherboard`;
  } else if (type == "gpu") {
    query = `SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.gpu_name, c.bus_interface, c.memory, c.monitor FROM PcParts p JOIN c IN p.gpu`;
  } else if (type == "ssd") {
    query = `SELECT c.name, c.price, c.sales_rank, c.manufacturer, c.capacity, c.cell_type, c.size, c.interface FROM PcParts p JOIN c IN p.ssd`;
  } else {
    return new Response(
      JSON.stringify({
        error: "type param error",
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const accountKey = process.env.COSMOS_KEY;
  const endpoint = process.env.COSMOS_ENDPOINT;
  const dbId = "Main";
  const collId = "PcParts";
  const client = new CosmosClient({ endpoint, accountKey, dbId, collId });

  const res = await client.queryDocuments({ query });
  return new Response(res.body, {
    status: res.status,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
