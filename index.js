const rethinkdb = require("rethinkdb");
(async () => {
    try {
        let conn = await rethinkdb.connect({port: process.env.PORT || 28015});
        console.log(conn);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();

