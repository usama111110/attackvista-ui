
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, Play, Clock, Database, AlertTriangle, Shield, Filter } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { threatHuntQueries, ThreatHuntQuery } from "@/utils/mitreAttackUtils";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThreatHunting() {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [queries] = useState<ThreatHuntQuery[]>(threatHuntQueries);
  const [selectedQuery, setSelectedQuery] = useState<ThreatHuntQuery | null>(null);
  const [customQuery, setCustomQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const runQuery = async (query: ThreatHuntQuery) => {
    setIsRunning(true);
    setSelectedQuery(query);
    
    // Simulate query execution
    setTimeout(() => {
      setIsRunning(false);
      const results = Math.floor(Math.random() * 50) + 1;
      
      toast({
        title: "Hunt Query Completed",
        description: `Found ${results} potential threats matching the criteria`,
        variant: results > 20 ? "destructive" : "default"
      });
    }, 2000);
  };

  const runCustomQuery = async () => {
    if (!customQuery.trim()) return;
    
    setIsRunning(true);
    
    setTimeout(() => {
      setIsRunning(false);
      const results = Math.floor(Math.random() * 30) + 1;
      
      toast({
        title: "Custom Query Executed",
        description: `Query returned ${results} results`,
      });
    }, 1500);
  };

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSeverity = severityFilter === "all" || query.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-50 dark:bg-red-950/30";
      case "high": return "text-orange-500 bg-orange-50 dark:bg-orange-950/30";
      case "medium": return "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30";
      case "low": return "text-blue-500 bg-blue-50 dark:bg-blue-950/30";
      default: return "text-gray-500 bg-gray-50 dark:bg-gray-950/30";
    }
  };

  return (
    <Card className={`p-6 backdrop-blur-lg border h-full ${
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Threat Hunting</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Real-time
        </Badge>
      </div>

      <Tabs defaultValue="predefined" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="predefined">Predefined Queries</TabsTrigger>
          <TabsTrigger value="custom">Custom Query</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search queries..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-muted/50"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredQueries.map((query) => (
              <div
                key={query.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  isDarkMode 
                    ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50" 
                    : "bg-white border-gray-200/80 hover:bg-gray-50/80"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{query.name}</h4>
                      <Badge className={getSeverityColor(query.severity)}>
                        {query.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {query.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Database className="h-3 w-3" />
                        <span>{query.dataSource}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Last run: {query.lastRun.toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{query.results} results</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => runQuery(query)}
                    disabled={isRunning}
                    className="gap-1"
                    size="sm"
                  >
                    <Play className="h-3 w-3" />
                    Run
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Custom Threat Hunt Query</label>
            <Textarea
              placeholder="Enter your custom SQL query here..."
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={runCustomQuery}
              disabled={isRunning || !customQuery.trim()}
              className="gap-1"
            >
              <Play className="h-4 w-4" />
              Execute Query
            </Button>
            <Button variant="outline" onClick={() => setCustomQuery("")}>
              Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results">
          {selectedQuery ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Results for: {selectedQuery.name}</h4>
              </div>
              
              {isRunning ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Executing threat hunt query...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Query execution completed. Found {selectedQuery.results} potential threats.
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {Array.from({ length: Math.min(selectedQuery.results, 5) }).map((_, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded border ${
                          isDarkMode ? "bg-gray-800/30 border-gray-700/30" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Threat match #{i + 1}</span>
                          <Badge variant="outline" className="text-xs">
                            Confidence: {85 + Math.floor(Math.random() * 15)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Run a query to see results</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
