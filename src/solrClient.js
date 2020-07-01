const SolrNode = require("solr-node");
//require("log4js").getLogger("solr-node").level = "DEBUG";

const cores = {
  projects: { host: "projects-cache.uberresearch.com" },
  publications: {
    host: "publications-cache.uberresearch.com",
    core: "dimensions-new",
  },
  datasets: { host: "datasets.uberresearch.com" },
  patents: { host: "patents.uberresearch.com" },
  clinicaltrials: { host: "clinicaltrials.uberresearch.com" },
  policydocuments: { host: "policydocuments.uberresearch.com" },
  researchers: { host: "projects-cache.uberresearch.com", core: "researchers" },
};

const core_id = "researchers";
const core = cores[core_id];

var client = new SolrNode({
  host: `ubersolr:Suche2heiv@${core.host}`,
  rootPath: "solr",
  port: 443,
  core: core.core,
  protocol: "https",
  debugLevel: "DEBUG",
});

module.exports = {
  client,
};
