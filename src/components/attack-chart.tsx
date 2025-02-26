
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "DDoS", value: 45 },
  { name: "Malware", value: 32 },
  { name: "Phishing", value: 28 },
  { name: "SQL Injection", value: 22 },
  { name: "XSS", value: 18 },
];

export function AttackChart() {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Attack Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "none",
              borderRadius: "4px",
            }}
          />
          <Bar dataKey="value" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
