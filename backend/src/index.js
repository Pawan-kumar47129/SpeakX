import app from "./app";
import connectDB from "./db";

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.on("error", (err) => {
      console.log("ERROR :: ", err);
    });
    app.listen(PORT, (error) => {
      if (error) {
        console.log("Server could not start successfully::", err.message);
      } else {
        console.log(`server start on port ${PORT}`);
      }
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR ", error.message);
  });
