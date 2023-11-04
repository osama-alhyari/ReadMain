import { app as app } from "./app.js";
import { db as db } from "./database/database.js";

const port = 8000;

db.sequelize.sync({ alter: false }).then(() => {
  app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`);
  });
});
