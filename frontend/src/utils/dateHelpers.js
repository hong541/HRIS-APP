export function getCurrentDateTime() {
  const now = new Date();
  const time = now.toTimeString().split(" ")[0];
  const date = now.toLocaleDateString();
  return { time, date };
}

export function getDay() {
  const now = new Date();
  return now.toLocaleDateString("en-US", { weekday: "long" });
}
