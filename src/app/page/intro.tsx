import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Copy, ChevronRight } from "lucide-react";

export default function QuickStartDocs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Chat API</h1>
        <p className="text-lg opacity-90">
          Powerful, simple, ready to integrate
        </p>
        <div className="mt-6 flex gap-4">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            API Reference
          </Button>
        </div>
      </div>

      {/* Installation card */}
      <Card className="mb-6 overflow-hidden border-0 shadow-lg">
        <div className="bg-gray-100 p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <h2 className="font-semibold">Installation</h2>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
        </div>
        <CardContent className="p-4 bg-gray-50">
          <code className="text-sm">npm install chat-api-client</code>
        </CardContent>
      </Card>

      {/* Quick example */}
      <Card className="mb-8 overflow-hidden border-0 shadow-lg">
        <div className="bg-gray-100 p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <h2 className="font-semibold">Quick Example</h2>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
        </div>
        <CardContent className="p-4 bg-gray-50">
          <pre className="text-sm">{`import { ChatClient } from 'chat-api-client';

// Initialize client
const client = new ChatClient('YOUR_API_KEY');

// Send a message
client.sendMessage({
  roomId: 'room-123',
  content: 'Hello world!'
});`}</pre>
        </CardContent>
      </Card>

      {/* Next steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Documentation", desc: "Explore the full API reference" },
          { title: "Examples", desc: "See integration examples" },
          { title: "Support", desc: "Get help from our team" },
        ].map((item) => (
          <Card
            key={item.title}
            className="border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto flex items-center gap-1 text-blue-600"
              >
                Learn more <ChevronRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Ready to dive deeper?</h3>
            <p className="text-sm text-gray-600">
              Check out our comprehensive API documentation
            </p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/docs/chat")}
          >
            View Full API Docs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
