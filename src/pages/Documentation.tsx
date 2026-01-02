import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Loader2 } from "lucide-react";

const Documentation = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega o conteúdo do arquivo Markdown da pasta public
    fetch("/documentation.md")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load documentation content.");
        }
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
      })
      .catch((error) => {
        console.error(error);
        setMarkdownContent("# Erro ao Carregar Documentação\n\nNão foi possível carregar o conteúdo técnico.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <MarkdownRenderer content={markdownContent} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;