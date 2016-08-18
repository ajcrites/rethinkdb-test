import r from 'rethinkdb';
import todos from './todo';

(async () => {
    try {
        const conn = await r.connect({port: 28015});

        // Ensure db/table/key creation
        await r.dbCreate("todo").run(conn);
        conn.use("todo");
        await Promise.all([
            r.tableCreate("users", {primaryKey: "name"}).run(conn),
            r.tableCreate("todo").run(conn),
        ]);
        await r.table("todo").indexCreate("user").run(conn);
        const named = {};

        // Seed database
        await Promise.all(todos.map(async todo => {
            // Insert unique users
            const user = named[todo.user];
            if (!user) {
                await r.table("users").insert({name: todo.user}).run(conn);
                named[todo.user] = true;
            }
            await r.table("todo").insert(todo).run(conn);
        }));

        await conn.close();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
