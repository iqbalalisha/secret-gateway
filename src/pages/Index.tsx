
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPublicRoute = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api");
      const data = await response.text();
      toast({
        title: "Public Route",
        description: data,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch public route",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSecretRoute = async () => {
    try {
      setLoading(true);
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch("/api/secret", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSecretMessage(data.message);
        toast({
          title: "Success",
          description: "Secret message retrieved successfully",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch secret route",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Secret Gateway</h1>
      
      <div className="w-full max-w-md grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Public Route</CardTitle>
            <CardDescription>Access the public endpoint that doesn't require authentication</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={fetchPublicRoute} 
              disabled={loading}
            >
              Access Public Route
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Secret Route</CardTitle>
            <CardDescription>Access the protected endpoint with Basic Authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            {secretMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium">Secret Message:</p>
                <p className="text-gray-700">{secretMessage}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={fetchSecretRoute}
              disabled={loading || !username || !password}
            >
              Access Secret Route
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
