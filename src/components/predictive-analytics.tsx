
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import { toast } from "sonner";

// Mock historical data for predictions
const historicalData = [
  { date: "Apr 1", actual: 42 },
  { date: "Apr 2", actual: 53 },
  { date: "Apr 3", actual: 58 },
  { date: "Apr 4", actual: 69 },
  { date: "Apr 5", actual: 74 },
  { date: "Apr 6", actual: 83 },
  { date: "Apr 7", actual: 86 },
  { date: "Apr 8", actual: 72 },
  { date: "Apr 9", predicted: 76, actual: 70, lowerBound: 62, upperBound: 84 },
  { date: "Apr 10", predicted: 81, lowerBound: 69, upperBound: 93 },
  { date: "Apr 11", predicted: 89, lowerBound: 74, upperBound: 104 },
  { date: "Apr 12", predicted: 98, lowerBound: 82, upperBound: 114 },
  { date: "Apr 13", predicted: 106, lowerBound: 88, upperBound: 124 },
  { date: "Apr 14", predicted: 112, lowerBound: 94, upperBound: 130 },
];

const anomalyPrediction = [
  { date: "Apr 1", value: 15, threshold: 30 },
  { date: "Apr 2", value: 22, threshold: 30 },
  { date: "Apr 3", value: 18, threshold: 30 },
  { date: "Apr 4", value: 25, threshold: 30 },
  { date: "Apr 5", value: 27, threshold: 30 },
  { date: "Apr 6", value: 29, threshold: 30 },
  { date: "Apr 7", value: 34, threshold: 30, anomaly: true },
  { date: "Apr 8", value: 39, threshold: 30, anomaly: true },
  { date: "Apr 9", value: 33, threshold: 30, anomaly: true },
  { date: "Apr 10", value: 28, threshold: 30 },
  { date: "Apr 11", value: 22, threshold: 30 },
  { date: "Apr 12", value: 19, threshold: 30 },
  { date: "Apr 13", value: 31, threshold: 30, anomaly: true },
  { date: "Apr 14", value: 24, threshold: 30 },
];

const patternRecognition = [
  { hour: "00:00", value: 12, pattern: "low" },
  { hour: "02:00", value: 8, pattern: "low" },
  { hour: "04:00", value: 5, pattern: "low" },
  { hour: "06:00", value: 10, pattern: "low" },
  { hour: "08:00", value: 25, pattern: "medium" },
  { hour: "10:00", value: 42, pattern: "high" },
  { hour: "12:00", value: 55, pattern: "high" },
  { hour: "14:00", value: 48, pattern: "high" },
  { hour: "16:00", value: 60, pattern: "high" },
  { hour: "18:00", value: 52, pattern: "high" },
  { hour: "20:00", value: 35, pattern: "medium" },
  { hour: "22:00", value: 20, pattern: "medium" },
];

export function PredictiveAnalytics() {
  const { isDarkMode } = useTheme();
  
  const exportData = (dataType: string) => {
    toast.success(`Analytics prediction data exported`, {
      description: `${dataType} data has been exported to CSV`,
    });
  };

  return (
    <Card className={`backdrop-blur-xl ${isDarkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/90 border-gray-200'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Predictive Analytics</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          onClick={() => exportData("Prediction")}
        >
          <Download size={14} />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="forecast">Attack Forecast</TabsTrigger>
            <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="pattern">Pattern Recognition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forecast" className="space-y-4">
            <div className="flex items-center mb-2 text-sm text-muted-foreground">
              <Info size={14} className="mr-1" />
              <span>Prediction based on historical attack data with confidence intervals</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <ReferenceLine x="Apr 8" stroke="#ff0000" label="Today" />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                    name="Actual Attacks" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={{ r: 3 }} 
                    name="Predicted Attacks" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="upperBound" 
                    stroke="#82ca9d" 
                    strokeWidth={1} 
                    strokeDasharray="3 3" 
                    dot={false} 
                    name="Upper Bound (95%)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lowerBound" 
                    stroke="#82ca9d" 
                    strokeWidth={1} 
                    strokeDasharray="3 3" 
                    dot={false} 
                    name="Lower Bound (95%)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-md">
                <div className="text-sm font-semibold mb-1">Peak Prediction</div>
                <div className="text-2xl font-bold text-primary">Apr 14</div>
                <div className="text-sm text-muted-foreground">Expected 112 attacks</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-md">
                <div className="text-sm font-semibold mb-1">Trend</div>
                <div className="text-2xl font-bold text-red-500">+24.4%</div>
                <div className="text-sm text-muted-foreground">Compared to last week</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-md">
                <div className="text-sm font-semibold mb-1">Confidence</div>
                <div className="text-2xl font-bold text-amber-500">85%</div>
                <div className="text-sm text-muted-foreground">Based on historical data</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="anomaly">
            <div className="flex items-center mb-2 text-sm text-muted-foreground">
              <Info size={14} className="mr-1" />
              <span>Anomaly detection identifies unusual patterns in attack behavior</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={anomalyPrediction}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }} 
                  />
                  <Legend />
                  <ReferenceLine y={30} label="Threshold" stroke="#ff0000" strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Unusual Activity"
                    stroke="#8884d8" 
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      if (payload.anomaly) {
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={6} 
                            fill="#ff0000" 
                            stroke="none" 
                          />
                        );
                      }
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={4} 
                          fill="#8884d8" 
                          stroke="none" 
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="pattern">
            <div className="flex items-center mb-2 text-sm text-muted-foreground">
              <Info size={14} className="mr-1" />
              <span>Pattern recognition helps identify regular attack schedules</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patternRecognition}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                      borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }} 
                    formatter={(value, name, props) => {
                      return [
                        `${value} attacks`,
                        `${props.payload.pattern.toUpperCase()} activity`
                      ];
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Activity Pattern"
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      let color = "#1E9";
                      
                      if (payload.pattern === "medium") {
                        color = "#FFA500";
                      } else if (payload.pattern === "high") {
                        color = "#FF4500";
                      }
                      
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={5} 
                          fill={color} 
                          stroke="none" 
                        />
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
