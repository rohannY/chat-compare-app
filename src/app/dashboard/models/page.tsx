import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft } from "lucide-react";
import providers from "./models";

export default function ModelsPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<{
    id: string;
    name: string;
    logo: string;
    description: string;
    models: {
      id: string;
      name: string;
      type: string;
      contextWindow: string;
      releaseDate: string;
    }[];
  } | null>(null);
  const [selectedModel, setSelectedModel] = useState<{
    id: string;
    name: string;
    type: string;
    contextWindow: string;
    releaseDate: string;
  } | null>(null);

  // Get unique model types for filtering
  const modelTypes = [
    ...new Set(providers.flatMap((p) => p.models.map((m) => m.type))),
  ];

  useEffect(() => {
    // Parse the URL to determine if we're on a provider page or a specific model page
    const pathParts = location.pathname.split("/").filter(Boolean);

    // If we have a provider in the URL
    if (pathParts.includes("models") && pathParts.length > 1) {
      const providerId = pathParts[pathParts.indexOf("models") + 1];
      const provider = providers.find((p) => p.id === providerId);
      setSelectedProvider(provider || null);

      // If we have a model in the URL
      if (pathParts.length > 2 && provider) {
        const modelId = pathParts[pathParts.indexOf(providerId) + 1];
        const model = provider.models.find((m) => m.id === modelId);
        setSelectedModel(model || null);
      } else {
        setSelectedModel(null);
      }
    } else {
      setSelectedProvider(null);
      setSelectedModel(null);
    }
  }, [location]);

  // Filter providers and models based on search query
  const filteredProviders = providers
    .map((provider) => ({
      ...provider,
      models: provider.models.filter(
        (model) =>
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.type.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (provider) =>
        provider.models.length > 0 ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Render the model detail view
  if (selectedModel && selectedProvider) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to={`/models/${selectedProvider.id}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {selectedProvider.name} models
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={selectedProvider.logo}
                alt={`${selectedProvider.name} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/32/32";
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{selectedModel.name}</h1>
              <p className="text-gray-500">{selectedProvider.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Type:</span>
                  <Badge>{selectedModel.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Context Window:</span>
                  <span>{selectedModel.contextWindow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Release Date:</span>
                  <span>{selectedModel.releaseDate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  This is a placeholder for model documentation. You can add
                  model-specific documentation, example prompts, and usage
                  guidelines here.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Full Documentation
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Render the provider detail view
  if (selectedProvider) {
    return (
      <div className="container mx-auto p-6">
        <div className="my-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={selectedProvider.logo}
                alt={`${selectedProvider.name} logo`}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/32/32";
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{selectedProvider.name}</h1>
              <p className="text-gray-500">{selectedProvider.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedProvider.models.map((model) => (
              <Card
                key={model.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{model.name}</CardTitle>
                    <Badge variant="outline">{model.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Context Window:</span>
                      <span>{model.contextWindow}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Release Date:</span>
                      <span>{model.releaseDate}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={`/models/${selectedProvider.id}/${model.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render the main providers view
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">LLM Models</h1>
        <p className="text-gray-500">
          Browse and discover available language models by provider
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search models or providers..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Providers</TabsTrigger>
          {modelTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => (
              <Card
                key={provider.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={provider.logo}
                        alt={`${provider.name} logo`}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/24/24";
                        }}
                      />
                    </div>
                    <CardTitle>{provider.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">
                    {provider.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {provider.models.slice(0, 3).map((model) => (
                      <div
                        key={model.id}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{model.name}</span>
                          <Badge variant="outline">{model.type}</Badge>
                        </div>
                      </div>
                    ))}
                    {provider.models.length > 3 && (
                      <div className="text-sm text-gray-500 text-center mt-2">
                        +{provider.models.length - 3} more models
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={`/models/${provider.id}`}>View Provider</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {modelTypes.map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProviders
                .map((provider) => ({
                  ...provider,
                  models: provider.models.filter(
                    (model) => model.type === type
                  ),
                }))
                .filter((provider) => provider.models.length > 0)
                .map((provider) => (
                  <Card
                    key={provider.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          <img
                            src={provider.logo}
                            alt={`${provider.name} logo`}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/api/placeholder/24/24";
                            }}
                          />
                        </div>
                        <CardTitle>{provider.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {provider.models.map((model) => (
                          <div
                            key={model.id}
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{model.name}</span>
                              <Badge variant="outline">{model.type}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to={`/models/${provider.id}`}>View Provider</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
