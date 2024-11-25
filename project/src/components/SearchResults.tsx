import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownContent } from './MarkdownContent';

export function SearchResults() {
  const { results, isStreaming } = useSearch();

  if (results.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>Start searching to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-secondary rounded-lg p-6"
          >
            {result.type === 'answer' ? (
              <div className="prose prose-invert max-w-none">
                <MarkdownContent content={result.content} />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  {result.url && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <p className="text-foreground/80">{result.content}</p>
                {result.url && (
                  <p className="text-muted-foreground text-sm">{result.url}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}