'use client';

import { useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(['x', 'devto', 'hashnode']);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, platforms }),
      });
      const data = await res.json();
      setResult(data);
      
      if (window.gtag) {
        window.gtag('event', 'generate_success', {
          platforms: platforms.join(','),
        });
      }
    } catch (error) {
      console.error(error);
      if (window.gtag) {
        window.gtag('event', 'generate_fail');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    if (window.gtag) {
      window.gtag('event', 'copy_click', { label });
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Social Post Copy Generator</h1>
      <p className="text-gray-600 mb-8">Generate platform-optimized titles, summaries, and hashtags in seconds</p>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block mb-2 font-medium">Product Description</label>
        <textarea
          className="w-full border rounded p-3 mb-4 min-h-[120px]"
          placeholder="Describe your product or content in 1-2 sentences..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 font-medium">Target Platforms</label>
        <div className="flex gap-4 mb-4">
          {['x', 'devto', 'hashnode'].map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={platforms.includes(p)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPlatforms([...platforms, p]);
                  } else {
                    setPlatforms(platforms.filter((x) => x !== p));
                  }
                }}
              />
              <span className="capitalize">{p === 'devto' ? 'Dev.to' : p === 'x' ? 'X' : 'Hashnode'}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Copy'}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Title Options</h3>
            {result.titles?.map((t: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <p className="flex-1 p-2 bg-gray-50 rounded">{t}</p>
                <button
                  onClick={() => copyToClipboard(t, `title_${i}`)}
                  className="text-blue-600 text-sm px-3 py-2 hover:bg-blue-50 rounded"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-2">Short Summary (X)</h3>
            <div className="flex items-start gap-2">
              <p className="flex-1 p-2 bg-gray-50 rounded">{result.shortSummary}</p>
              <button
                onClick={() => copyToClipboard(result.shortSummary, 'short_summary')}
                className="text-blue-600 text-sm px-3 py-2 hover:bg-blue-50 rounded"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Long Summary (Dev.to/Hashnode)</h3>
            <div className="flex items-start gap-2">
              <p className="flex-1 p-2 bg-gray-50 rounded whitespace-pre-wrap">{result.longSummary}</p>
              <button
                onClick={() => copyToClipboard(result.longSummary, 'long_summary')}
                className="text-blue-600 text-sm px-3 py-2 hover:bg-blue-50 rounded"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Hashtags</h3>
            <div className="flex items-start gap-2">
              <p className="flex-1 p-2 bg-gray-50 rounded">{result.hashtags}</p>
              <button
                onClick={() => copyToClipboard(result.hashtags, 'hashtags')}
                className="text-blue-600 text-sm px-3 py-2 hover:bg-blue-50 rounded"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Call-to-Action Options</h3>
            {result.ctas?.map((c: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <p className="flex-1 p-2 bg-gray-50 rounded">{c}</p>
                <button
                  onClick={() => copyToClipboard(c, `cta_${i}`)}
                  className="text-blue-600 text-sm px-3 py-2 hover:bg-blue-50 rounded"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Free tool for content creators • No login required</p>
      </footer>
    </main>
  );
}
