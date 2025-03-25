import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ChevronDown,
  Copy,
  Check,
  Server,
  FileJson,
  Code,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RequestBodyField {
  name: string;
  required: boolean;
  type: string;
  description: string;
  format?: string;
}

interface CodeExample {
  language: string;
  code: string;
}

interface ChatProps {
  apiEndpoint?: string;
  initialFields?: RequestBodyField[];
}

const Chat: React.FC<ChatProps> = ({
  apiEndpoint = "/api/chat",
  initialFields,
}) => {
  const [activeTab, setActiveTab] = useState("curl");
  const [responseOpen, setResponseOpen] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const defaultRequestBodyFields: RequestBodyField[] = [
    {
      name: "provider",
      required: true,
      type: "string",
      description: "The provider for the chat model.",
    },
    {
      name: "model",
      required: true,
      type: "string",
      description: "The specific chat model to use.",
    },
    {
      name: "messages",
      required: true,
      type: "string",
      description: "An array of messages for the chat.",
    },
    {
      name: "chatRequestSettings",
      required: true,
      type: "string",
      description: "Settings for the chat request.",
    },
  ];

  const requestBodyFields = initialFields || defaultRequestBodyFields;

  const jsonExample = {
    provider: "string",
    model: "string",
    messages: [
      {
        role: "string",
        content: "string",
      },
    ],
    chatRequestSettings: {
      temperature: 0,
      rememberHistory: true,
      maxTokens: 0,
      stream: true,
    },
  };

  const responseExample = {
    message: "string",
    totalTokens: 0,
    cost: 0,
    timeTaken: "string",
  };

  // Code examples for different languages
  const codeExamples: Record<string, CodeExample> = {
    curl: {
      language: "curl",
      code: `curl -X POST "${apiEndpoint}" \\
        -H "Content-Type: application/json" \\
        -d '{
        "provider": "string",
        "model": "string",
        "messages": [
          {
            "role": "string",
            "content": "string"
          }
        ],
        "chatRequestSettings": {
          "temperature": 0,
          "rememberHistory": true,
          "maxTokens": 0,
          "stream": true
        }
      }'`,
    },
    javascript: {
          language: "javascript",
          code: `const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "provider": "string",
        "model": "string",
        "messages": [
          {
            "role": "string",
            "content": "string"
          }
        ],
        "chatRequestSettings": {
          "temperature": 0,
          "rememberHistory": true,
          "maxTokens": 0,
          "stream": true
        }
      })
    };

    fetch('${apiEndpoint}', options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));`,
        },
    python: {
      language: "python",
      code: `import requests
import json

url = "${apiEndpoint}"
headers = {'Content-type': 'application/json'}
data = json.dumps({
  "provider": "string",
  "model": "string",
  "messages": [
    {
      "role": "string",
      "content": "string"
    }
  ],
  "chatRequestSettings": {
    "temperature": 0,
    "rememberHistory": True,
    "maxTokens": 0,
    "stream": True
  }
})
response = requests.post(url, data=data, headers=headers)

print(response.json())`,
    },
    go: {
      language: "go",
      code: `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "${apiEndpoint}"

  jsonData := map[string]interface{}{
    "provider": "string",
    "model": "string",
    "messages": []map[string]interface{}{
      {
        "role": "string",
        "content": "string",
      },
    },
    "chatRequestSettings": map[string]interface{}{
      "temperature": 0,
      "rememberHistory": true,
      "maxTokens": 0,
      "stream": true,
    },
  }

  jsonValue, _ := json.Marshal(jsonData)

  req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
  req.Header.Set("Content-Type", "application/json")

  client := &http.Client{}
  resp, err := client.Do(req)

  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  defer resp.Body.Close()

  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Special event created!", formData);
    // Logic to submit the form data would go here
    setResponseOpen(true);
  };

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Component to render input field based on field type
  const FieldInput = ({ field }: { field: RequestBodyField }) => {
    switch (field.type) {
      case "string":
        return (
          <Input
            className="bg-[#1a1a1a] border-gray-700 text-gray-300 w-full"
            placeholder={field.name}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            className="bg-[#1a1a1a] border-gray-700 text-gray-300 w-full"
            placeholder={field.name}
            onChange={(e) =>
              handleInputChange(field.name, parseFloat(e.target.value))
            }
          />
        );
      case "string-array":
        return (
          <Input
            className="bg-[#1a1a1a] border-gray-700 text-gray-300 w-full"
            placeholder={`${field.name} (comma separated list)`}
            onChange={(e) =>
              handleInputChange(
                field.name,
                e.target.value.split(",").map((item) => item.trim())
              )
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-gray-300 flex w-full flex-1 flex-col gap-6 px-6 xl:mx-auto max-w-[1280px] max-sm:pb-16">
      <div className="flex items-center py-4">
        <h1 className="text-3xl font-bold text-white">Chat API</h1>
      </div>
      <p className="text-muted-foreground text-base text-start">
        Provides an API for AI chat interaction—send messages, get responses,
        and configure models.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-[#111] h-fit">
          <div className="flex items-center gap-2 p-4 border-b border-gray-800 bg-[#151515]">
            <Badge className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-xs font-medium text-white cursor-pointer">
              POST
            </Badge>
            <div className="text-gray-300 font-mono text-sm">{apiEndpoint}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-gray-400 hover:text-white"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                <Server className="h-4 w-4 mr-2" /> Server Configuration
              </h2>

              <div className="mb-4 rounded-md overflow-hidden bg-[#151515] border border-gray-800">
                <div className="p-3 flex items-center justify-between bg-[#1a1a1a]">
                  <span className="text-sm font-medium">Server URL</span>
                </div>
                <div className="p-4">
                  <Input
                    className="bg-[#1a1a1a] border-gray-700 text-gray-300"
                    placeholder="https://redocly.com/_mock/docs/openapi/museum-api"
                    defaultValue="https://redocly.com/_mock/docs/openapi/museum-api"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
                <FileJson className="h-4 w-4 mr-2" /> Request Body
              </h2>

              <div className="space-y-6 rounded-md overflow-hidden bg-[#151515] border border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Content Type</span>
                  <Badge className="bg-[#1a1a1a] text-white border border-gray-700 hover:bg-[#222]">
                    application/json
                  </Badge>
                </div>

                {requestBodyFields.map((field) => (
                  <div
                    key={field.name}
                    className="border-t border-gray-800 pt-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <label className="text-sm font-medium">
                          {field.name}
                        </label>
                        {field.required && (
                          <Badge className="ml-2 bg-red-600 hover:bg-red-700 text-xs text-white">
                            Required
                          </Badge>
                        )}
                      </div>
                      <Badge className="bg-[#1a1a1a] text-gray-400 border border-gray-700 hover:bg-[#222]">
                        {field.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      {field.description}
                      {field.format && (
                        <span className="block mt-1">
                          Format: {field.format}
                        </span>
                      )}
                    </div>
                    <FieldInput field={field} />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Right column: Examples & Response */}
        <div>
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-800 bg-[#111]">
            <div className="p-4 border-b border-gray-800 bg-[#151515] flex justify-between items-center">
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-2" />
                <h2 className="text-lg font-semibold text-white">
                  Code Examples
                </h2>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-[#1a1a1a]"
                onClick={() =>
                  handleCopyCode(JSON.stringify(jsonExample, null, 2), "json")
                }
              >
                {copySuccess === "json" ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copySuccess === "json" ? "Copied" : "Copy JSON"}
              </Button>
            </div>
            <Tabs
              defaultValue="curl"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-[#2c2c2c] w-full justify-start p-0 h-auto border-b border-gray-800 rounded-none">
                {Object.keys(codeExamples).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={`px-4 py-2 rounded-none border-b-2 ${
                      activeTab === key
                        ? "border-gray-400 text-white"
                        : "border-transparent text-gray-400"
                    }`}
                  >
                    {key === "curl"
                      ? "cURL"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(codeExamples).map(([key, example]) => (
                <TabsContent key={key} value={key} className="p-0 m-0 relative">
                  <SyntaxHighlighter
                    language={key}
                    style={atomDark}
                    customStyle={{ backgroundColor: "#0d0d0d" }}
                    wrapLongLines
                  >
                    {example.code}
                  </SyntaxHighlighter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-[#1a1a1a] hover:bg-[#222] text-gray-400 hover:text-white"
                    onClick={() => handleCopyCode(example.code, key)}
                  >
                    {copySuccess === key ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#111]">
            <div
              className="p-4 bg-[#151515] border-b border-gray-800 flex items-center cursor-pointer"
              onClick={() => setResponseOpen(!responseOpen)}
            >
              <div className="bg-green-600 w-2 h-2 rounded-full mr-2"></div>
              <h2 className="text-lg font-semibold text-white flex-1">
                Response (201 Created)
              </h2>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  responseOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {responseOpen && (
              <div className="p-0">
                <div className="flex border-b border-gray-800">
                  <div className="p-3 border-r border-gray-800 bg-[#1a1a1a] text-sm font-medium">
                    Content-Type
                  </div>
                  <div className="p-3 flex-1">application/json</div>
                </div>
                <div className="relative">
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto bg-[#0d0d0d] font-mono">
                    {JSON.stringify(responseExample, null, 2)}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-[#1a1a1a] hover:bg-[#222] text-gray-400 hover:text-white"
                    onClick={() =>
                      handleCopyCode(
                        JSON.stringify(responseExample, null, 2),
                        "response"
                      )
                    }
                  >
                    {copySuccess === "response" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
