//here'll be dragons
import fs from "fs";
import path from "path";

function processLogs() {
  const logPath = path.join("/logs", "log.txt");
  const reportPath = path.join("/logs", "report.txt");

  setInterval(() => {
    if (fs.existsSync(logPath)) {
      fs.readFile(logPath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading log file: ${err.message}`);
          return;
        }

        fs.writeFile(reportPath, data, (err) => {
          if (err) {
            console.error(`Error writing report file: ${err.message}`);
          } else {
            console.log(
              `Report updated with ${data.split("\n").length - 1} log entries.`
            );
          }
        });
      });
    } else {
      console.log(`${logPath} not found. Skipping report update.`);
    }
  }, 30000); // 30 seconds interval
}

processLogs();
