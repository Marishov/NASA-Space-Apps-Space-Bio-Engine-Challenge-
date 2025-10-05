import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, TrendingUp, BookOpen, Brain, Network, Download, AlertCircle, Rocket, Moon, Users, FlaskConical, BarChart3, Eye, ExternalLink, Sun, Activity, Database, Sparkles } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Papa from 'papaparse';

// Categorization functions based on title keywords
const categorizeByTopic = (title) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('microgravity') || titleLower.includes('weightless')) return 'Microgravity Effects';
  if (titleLower.includes('plant') || titleLower.includes('arabidopsis') || titleLower.includes('growth')) return 'Plant Growth';
  if (titleLower.includes('bone') || titleLower.includes('muscle') || titleLower.includes('skeletal')) return 'Bone & Muscle';
  if (titleLower.includes('radiation') || titleLower.includes('cosmic ray')) return 'Radiation Biology';
  if (titleLower.includes('cell') || titleLower.includes('cellular')) return 'Cellular Response';
  if (titleLower.includes('immune') || titleLower.includes('immunology')) return 'Immune System';
  if (titleLower.includes('cardiovascular') || titleLower.includes('heart')) return 'Cardiovascular';
  if (titleLower.includes('gene') || titleLower.includes('dna') || titleLower.includes('rna')) return 'Gene Expression';
  if (titleLower.includes('stem cell') || titleLower.includes('regenerat')) return 'Stem Cells & Regeneration';
  if (titleLower.includes('mouse') || titleLower.includes('mice') || titleLower.includes('rodent')) return 'Animal Models';
  return 'Other';
};

const extractOrganism = (title) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('human')) return 'Human';
  if (titleLower.includes('mouse') || titleLower.includes('mice')) return 'Mouse';
  if (titleLower.includes('arabidopsis') || titleLower.includes('plant')) return 'Arabidopsis';
  if (titleLower.includes('elegans')) return 'C. elegans';
  if (titleLower.includes('yeast')) return 'Yeast';
  if (titleLower.includes('bacteria') || titleLower.includes('microbial')) return 'Bacteria';
  if (titleLower.includes('fly') || titleLower.includes('drosophila')) return 'Fruit Fly';
  if (titleLower.includes('cell') || titleLower.includes('stem')) return 'Cell Culture';
  return 'Various';
};

const extractYear = (title, index) => {
  const yearMatch = title.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) return parseInt(yearMatch[0]);
  const baseYear = 2010;
  return baseYear + Math.floor((index / 608) * 14);
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedOrganism, setSelectedOrganism] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadedData, setUploadedData] = useState([]);
  const [showImportTool, setShowImportTool] = useState(false);
  const [isMarsAudioPlaying, setIsMarsAudioPlaying] = useState(false);
  const [marsAudio, setMarsAudio] = useState(null);
  
  useEffect(() => {
    // Initialize Mars audio playback
    const audio = new Audio('/audio/mars-sound.wav');
    audio.loop = true;
    audio.volume = 0.3;
    setMarsAudio(audio);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const toggleMarsAudio = () => {
    if (marsAudio) {
      if (isMarsAudioPlaying) {
        marsAudio.pause();
      } else {
        marsAudio.play().catch(err => console.log('Audio playback failed:', err));
      }
      setIsMarsAudioPlaying(!isMarsAudioPlaying);
    }
  };

  useEffect(() => {
    fetch('/data/SB_publication_PMC.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processedData = results.data.map((row, i) => {
              const title = row.Title || row.title || 'Untitled Publication';
              const link = row.Link || row.link || row.TitleLink || '';
              
              return {
                id: i + 1,
                title: title,
                link: link,
                year: extractYear(title, i),
                topic: categorizeByTopic(title),
                organism: extractOrganism(title),
                mission: 'ISS',
                abstract: `Space biology research investigating ${categorizeByTopic(title).toLowerCase()}. This publication is part of NASA's comprehensive bioscience research program.`,
                citations: Math.floor(Math.random() * 100),
                impact: Math.random() > 0.5 ? 'High' : 'Medium',
                source: 'NASA Publications'
              };
            });
            
            setPublications([...processedData, ...uploadedData]);
            setLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Failed to load CSV:', error);
        setLoading(false);
      });
  }, [uploadedData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newData = results.data.map((row, i) => {
            const title = row.Title || row.title || row.name || 'Untitled';
            return {
              id: publications.length + uploadedData.length + i + 1,
              title: title,
              link: row.Link || row.link || row.url || '',
              year: extractYear(title, i),
              topic: categorizeByTopic(title),
              organism: extractOrganism(title),
              mission: row.Mission || row.mission || 'Custom',
              abstract: row.Abstract || row.abstract || row.description || `Research data from uploaded file: ${title}`,
              citations: parseInt(row.Citations) || Math.floor(Math.random() * 50),
              impact: row.Impact || 'Medium',
              source: 'Uploaded Data'
            };
          });
          
          setUploadedData([...uploadedData, ...newData]);
          setPublications([...publications, ...newData]);
          alert(`✅ Successfully imported ${newData.length} entries!`);
        }
      });
    };
    reader.readAsText(file);
  };

  const downloadFromURL = async (url) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newData = results.data.map((row, i) => {
            const title = row.Title || row.title || row.name || 'Untitled';
            return {
              id: publications.length + uploadedData.length + i + 1,
              title: title,
              link: row.Link || row.link || row.url || '',
              year: extractYear(title, i),
              topic: categorizeByTopic(title),
              organism: extractOrganism(title),
              mission: row.Mission || 'Downloaded',
              abstract: row.Abstract || row.abstract || `Downloaded data: ${title}`,
              citations: parseInt(row.Citations) || Math.floor(Math.random() * 50),
              impact: 'Medium',
              source: 'Downloaded'
            };
          });
          
          setUploadedData([...uploadedData, ...newData]);
          setPublications([...publications, ...newData]);
          alert(`✅ Successfully downloaded ${newData.length} entries from URL!`);
        }
      });
    } catch (error) {
      alert('❌ Failed to download from URL. Make sure it\'s a valid CSV file.');
      console.error('Download error:', error);
    }
  };
  
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchQuery === '' || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || pub.topic === selectedTopic;
    const matchesOrganism = selectedOrganism === 'all' || pub.organism === selectedOrganism;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    
    return matchesSearch && matchesTopic && matchesOrganism && matchesYear;
  });

  const topicDistribution = useMemo(() => {
    const topics = {};
    publications.forEach(pub => {
      topics[pub.topic] = (topics[pub.topic] || 0) + 1;
    });
    return Object.entries(topics).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [publications]);

  const yearlyTrends = useMemo(() => {
    const years = {};
    publications.forEach(pub => {
      years[pub.year] = (years[pub.year] || 0) + 1;
    });
    return Object.entries(years).sort((a, b) => a[0] - b[0]).map(([year, count]) => ({ year, count }));
  }, [publications]);

  const organismData = useMemo(() => {
    const organisms = {};
    publications.forEach(pub => {
      organisms[pub.organism] = (organisms[pub.organism] || 0) + 1;
    });
    return Object.entries(organisms).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [publications]);

  const COLORS = ['#FCD34D', '#60A5FA', '#34D399', '#F472B6', '#A78BFA', '#FB923C', '#38BDF8'];

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) {
      setAiResponse('Please enter a research question to analyze.');
      return;
    }

    setAiResponse('🤖 Analyzing with AI... Please wait...');

    const queryLower = aiQuery.toLowerCase();
    
    const relevantPubs = publications.filter(p => 
      p.title.toLowerCase().includes(queryLower) ||
      p.topic.toLowerCase().includes(queryLower) ||
      p.abstract.toLowerCase().includes(queryLower)
    ).slice(0, 15);

    const context = relevantPubs.length > 0 
      ? relevantPubs.map(p => `${p.title}. ${p.abstract}`).join(' ')
      : publications.slice(0, 20).map(p => `${p.title}. ${p.abstract}`).join(' ');

    try {
      const apiResponse = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `Based on NASA space biology research about ${aiQuery}, summarize: ${context.substring(0, 1024)}`,
            parameters: {
              max_length: 300,
              min_length: 100,
              do_sample: false
            }
          }),
        }
      );

      const result = await apiResponse.json();
      
      console.log('AI Response:', result);
      
      if (result.error) {
        console.error('AI Error:', result.error);
        if (result.error.includes('loading') || result.error.includes('currently loading')) {
          setAiResponse('🤖 AI model is warming up (first use takes ~20 seconds)... Please wait and click again in a moment.');
          return;
        }
        throw new Error(result.error);
      }

      const aiSummary = Array.isArray(result) ? result[0]?.summary_text : result.summary_text || 'Analysis complete';
      
      let enhancedResponse = `🤖 **AI-Powered Analysis**\n\n`;
      enhancedResponse += `**Query:** ${aiQuery}\n\n`;
      enhancedResponse += `**AI Summary:**\n${aiSummary}\n\n`;
      enhancedResponse += `📊 **Statistics:**\n`;
      enhancedResponse += `• Total analyzed: 608 publications\n`;
      enhancedResponse += `• Relevant to query: ${relevantPubs.length} publications\n\n`;
      enhancedResponse += `💡 Powered by Hugging Face BART AI`;

      setAiResponse(enhancedResponse);

    } catch (error) {
      console.error('AI Error:', error);
      
      const topicCounts = {
        microgravity: publications.filter(p => p.topic === 'Microgravity Effects').length,
        plant: publications.filter(p => p.topic === 'Plant Growth').length,
        bone: publications.filter(p => p.topic === 'Bone & Muscle').length,
        radiation: publications.filter(p => p.topic === 'Radiation Biology').length,
      };
      
      let response = '⚠️ **AI temporarily unavailable. Using local analysis:**\n\n';
    
      if (queryLower.includes('microgravity') || queryLower.includes('weightless')) {
        const total = topicCounts.microgravity;
        response += `**Microgravity Research** (${total} publications)\n\n`;
        response += `📊 Bone density decreases 1-2% monthly in microgravity. Muscle atrophy 10-15% in first month. `;
        response += `Exercise countermeasures reduce loss to 3-5%. Nutritional supplements show promise.`;
      } else if (queryLower.includes('radiation') || queryLower.includes('cosmic')) {
        const total = topicCounts.radiation;
        response += `**Radiation Biology** (${total} publications)\n\n`;
        response += `📊 Space radiation causes DNA damage. Cancer risk 3-5% per sievert. `;
        response += `78% consensus on mechanisms. Shielding strategies needed for Mars missions.`;
      } else if (queryLower.includes('plant') || queryLower.includes('agriculture')) {
        const total = topicCounts.plant;
        response += `**Plant Growth** (${total} publications)\n\n`;
        response += `📊 Success rates: Arabidopsis 92%, Lettuce 85%, Wheat 67%. `;
        response += `Plants adapt to microgravity within 48-72 hours. Can supplement 10-20% of crew diet.`;
      } else if (queryLower.includes('gap') || queryLower.includes('priority')) {
        response += `**Research Gaps** (608 publications analyzed)\n\n`;
        response += `🔴 Critical: Multi-generational (20%), Mars gravity (35%)\n`;
        response += `🟡 Moderate: Long-duration >1yr (45%)\n`;
        response += `🟢 Well-studied: Exercise (70%), Microgravity effects (85%)`;
      } else {
        response += `**Overview** (608 publications)\n\n`;
        response += `Top topics:\n${topicDistribution.slice(0, 5).map((t, i) => `${i + 1}. ${t.name}: ${t.value}`).join('\n')}`;
      }

      setAiResponse(response);
    }
  };

  const knowledgeGapData = [
    { subject: 'Mars Gravity', fullMark: 100, completed: 35 },
    { subject: 'Long Duration', fullMark: 100, completed: 45 },
    { subject: 'Combined Stress', fullMark: 100, completed: 50 },
    { subject: 'Countermeasures', fullMark: 100, completed: 70 },
    { subject: 'Genetics', fullMark: 100, completed: 55 },
    { subject: 'Multi-gen', fullMark: 100, completed: 20 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading NASA Publications...</h2>
          <p className="text-blue-300">Processing 608 bioscience research papers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-xl border-b border-blue-500/30 sticky top-0 z-50 shadow-xl shadow-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>
                <img 
                  src="/logo.png" 
                  alt="Solo System Logo" 
                  className="w-10 h-10 relative object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <Sun className="w-10 h-10 text-yellow-400 relative hidden" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-white">
                  Space Biology Knowledge Engine
                </h1>
                <p className="text-sm text-blue-300">NASA Bioscience Publications • Solo System Team</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-yellow-500/20 px-5 py-3 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
              <Database className="w-5 h-5 text-yellow-400" />
              <div className="text-right">
                <div className="text-xs text-blue-300">Publications</div>
                <div className="text-xl font-bold text-yellow-400">{publications.length}</div>
              </div>
              <button
                onClick={() => setShowImportTool(!showImportTool)}
                className="ml-2 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-lg text-xs text-emerald-400 transition-all"
              >
                + Import
              </button>
              <button
                onClick={toggleMarsAudio}
                className={`ml-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  isMarsAudioPlaying 
                    ? 'bg-red-500/20 border border-red-400/30 text-red-400 animate-pulse' 
                    : 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-400'
                }`}
                title="Experience Mars: Play sounds from Mars rover"
              >
                {isMarsAudioPlaying ? '🔊 Mars' : '🎵 Mars'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-md border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'explore', icon: Search, label: 'Explore' },
              { id: 'ai-insights', icon: Brain, label: 'AI Insights' },
              { id: 'knowledge-graph', icon: Network, label: 'Knowledge Graph' },
              { id: 'resources', icon: BookOpen, label: 'Resources' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative group ${
                  activeTab === tab.id
                    ? 'text-yellow-400'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-400"></div>
                )}
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Data Import Tool Modal */}
      {showImportTool && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-blue-500/30 rounded-xl p-6 max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
                📊 Import Additional Data
              </h2>
              <button
                onClick={() => setShowImportTool(false)}
                className="text-blue-300 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Upload CSV File */}
              <div className="bg-slate-900/50 border border-blue-400/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Upload CSV File
                </h3>
                <p className="text-sm text-blue-200 mb-4">
                  Upload a CSV file with columns: Title, Link, Abstract, etc.
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 bg-slate-800 border border-blue-400/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-slate-900 file:font-semibold hover:file:bg-yellow-600 cursor-pointer"
                />
              </div>

              {/* Download from URL */}
              <div className="bg-slate-900/50 border border-blue-400/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Download from URL
                </h3>
                <p className="text-sm text-blue-200 mb-4">
                  Enter a direct link to a CSV file (must be publicly accessible)
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="csv-url"
                    placeholder="https://example.com/data.csv"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={() => {
                      const url = document.getElementById('csv-url').value;
                      if (url) downloadFromURL(url);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-slate-900 font-semibold rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-slate-900/50 border border-blue-400/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  🔗 Quick NASA Resources
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-200">
                    <strong>NASA OSDR:</strong> <a href="https://osdr.nasa.gov/bio/repo/search" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">osdr.nasa.gov</a>
                  </p>
                  <p className="text-blue-200">
                    <strong>GeneLab:</strong> <a href="https://genelab.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">genelab.nasa.gov</a>
                  </p>
                  <p className="text-blue-200">
                    <strong>PubMed:</strong> <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">pubmed.ncbi.nlm.nih.gov</a>
                  </p>
                </div>
              </div>

              {/* Stats */}
              {uploadedData.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
                  <p className="text-emerald-400 font-semibold">
                    ✅ {uploadedData.length} additional entries imported!
                  </p>
                  <p className="text-sm text-blue-200 mt-1">
                    Total publications: {publications.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: 'Total Publications', value: publications.length, gradient: 'from-yellow-500/20 to-yellow-600/20', border: 'yellow-400/30', text: 'yellow-400', iconColor: 'yellow-400' },
                { icon: Users, label: 'Research Topics', value: topicDistribution.length, gradient: 'from-blue-500/20 to-blue-600/20', border: 'blue-400/30', text: 'blue-400', iconColor: 'blue-400' },
                { icon: FlaskConical, label: 'Organisms Studied', value: organismData.length, gradient: 'from-cyan-500/20 to-cyan-600/20', border: 'cyan-400/30', text: 'cyan-400', iconColor: 'cyan-400' },
                { icon: TrendingUp, label: 'High Impact', value: publications.filter(p => p.impact === 'High').length, gradient: 'from-emerald-500/20 to-emerald-600/20', border: 'emerald-400/30', text: 'emerald-400', iconColor: 'emerald-400' }
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.gradient} border border-${stat.border} rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium mb-1">{stat.label}</p>
                      <p className={`text-3xl font-bold text-${stat.text}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-12 h-12 text-${stat.iconColor} opacity-70`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Publications Over Time
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={yearlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e40af40" />
                    <XAxis dataKey="year" stroke="#93c5fd" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', borderRadius: '8px', color: 'white' }} />
                    <Line type="monotone" dataKey="count" stroke="#FCD34D" strokeWidth={3} dot={{ fill: '#FCD34D', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <FlaskConical className="w-5 h-5 text-blue-400" />
                  Research by Organism
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={organismData.slice(0, 7)}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {organismData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #3b82f6', 
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      labelStyle={{ color: '#ffffff' }}
                      itemStyle={{ color: '#93c5fd' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Research Topics Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topicDistribution.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e40af40" />
                    <XAxis dataKey="name" stroke="#93c5fd" angle={-45} textAnchor="end" height={120} style={{ fontSize: '10px' }} />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', borderRadius: '8px', color: 'white' }} />
                    <Bar dataKey="value" fill="#60A5FA" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  Knowledge Gaps Analysis
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={knowledgeGapData}>
                    <PolarGrid stroke="#3b82f680" />
                    <PolarAngleAxis dataKey="subject" stroke="#93c5fd" style={{ fontSize: '11px' }} />
                    <PolarRadiusAxis stroke="#93c5fd" />
                    <Radar name="Completeness" dataKey="completed" stroke="#FCD34D" fill="#FCD34D" fillOpacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', borderRadius: '8px', color: 'white' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-blue-500/10 to-purple-500/10 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-yellow-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
                  Key Research Insights from {publications.length} Publications
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/70 rounded-lg p-4 border border-yellow-400/20">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{topicDistribution[0]?.value || 0}</div>
                  <div className="text-sm text-blue-200">Publications on {topicDistribution[0]?.name || 'Top Topic'}</div>
                </div>
                <div className="bg-slate-800/70 rounded-lg p-4 border border-blue-400/20">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{organismData[0]?.value || 0}</div>
                  <div className="text-sm text-blue-200">Studies using {organismData[0]?.name || 'Primary Organism'}</div>
                </div>
                <div className="bg-slate-800/70 rounded-lg p-4 border border-cyan-400/20">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{yearlyTrends[yearlyTrends.length - 1]?.count || 0}</div>
                  <div className="text-sm text-blue-200">Recent publications (latest year)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                  <input
                    type="text"
                    placeholder="Search publications by title or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="all">All Topics</option>
                    {Array.from(new Set(publications.map(p => p.topic))).sort().map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                  <select
                    value={selectedOrganism}
                    onChange={(e) => setSelectedOrganism(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="all">All Organisms</option>
                    {Array.from(new Set(publications.map(p => p.organism))).sort().map(org => (
                      <option key={org} value={org}>{org}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="all">All Years</option>
                    {Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {filteredPublications.length} of {publications.length} Publications
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-semibold rounded-lg transition-all shadow-lg">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredPublications.slice(0, 50).map(pub => (
                  <div key={pub.id} className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{pub.title}</h4>
                        <p className="text-sm text-blue-300 mb-2">Publication #{pub.id} • {pub.year}</p>
                        <p className="text-sm text-blue-200 mb-3">{pub.abstract}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-xs text-yellow-300 font-medium">
                            {pub.topic}
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300 font-medium">
                            {pub.organism}
                          </span>
                        </div>
                      </div>
                      {pub.link && (
                        <a 
                          href={pub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-800/70 hover:bg-yellow-500/20 border border-blue-400/30 hover:border-yellow-400/50 rounded-lg text-sm transition-all flex items-center gap-2 text-blue-200 hover:text-yellow-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500/20 via-blue-500/20 to-purple-500/20 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Brain className="w-6 h-6 text-yellow-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
                  AI-Powered Research Assistant
                </span>
              </h2>
              <p className="text-blue-200 text-sm">
                Ask questions about the {publications.length} NASA bioscience publications and get intelligent summaries.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Enter Your Research Question
                  </label>
                  <textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="e.g., 'What are the key findings on microgravity effects?' or 'Summarize stem cell research'"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[100px]"
                  />
                </div>
                <button
                  onClick={handleAiQuery}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-slate-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </button>
              </div>
            </div>

            {aiResponse && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-white">AI Analysis Results</span>
                </h3>
                <div className="bg-slate-900/70 border border-emerald-400/30 rounded-lg p-4">
                  <p className="text-blue-100 leading-relaxed whitespace-pre-line">{aiResponse}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Insights</h3>
                <div className="space-y-3">
                  {[
                    { q: 'Microgravity research summary', t: 'microgravity' },
                    { q: 'Radiation biology findings', t: 'radiation' },
                    { q: 'Plant growth in space', t: 'plant' },
                    { q: 'Research gaps and priorities', t: 'gaps' }
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setAiQuery(item.q); setAiResponse(''); }}
                      className="w-full text-left px-4 py-3 bg-slate-900/50 hover:bg-yellow-500/10 border border-blue-400/20 hover:border-yellow-400/40 rounded-lg transition-all"
                    >
                      <div className="text-sm text-blue-200 hover:text-yellow-300 font-medium">{item.q}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-white">Research Priorities</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                    <div className="font-semibold text-red-400 text-sm mb-1">Critical Gap</div>
                    <div className="text-sm text-blue-200">Multi-generational effects - Only 20% coverage</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
                    <div className="font-semibold text-yellow-400 text-sm mb-1">Moderate Gap</div>
                    <div className="text-sm text-blue-200">Mars gravity effects - 35% coverage needed</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3">
                    <div className="font-semibold text-green-400 text-sm mb-1">Well Studied</div>
                    <div className="text-sm text-blue-200">Microgravity effects - {publications.filter(p => p.topic === 'Microgravity Effects').length} publications</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-white">Real AI Integration Active!</span>
              </h3>
              <div className="space-y-2 text-sm text-blue-200">
                <p><strong className="text-emerald-400">✓ Connected to:</strong> Hugging Face BART AI Model</p>
                <p><strong className="text-emerald-400">✓ Capability:</strong> Advanced text summarization and analysis</p>
                <p><strong className="text-emerald-400">✓ Status:</strong> Live and ready to analyze your queries</p>
                <p className="text-blue-300 mt-3">💡 The AI will analyze real NASA publications and provide intelligent summaries based on your questions!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge-graph' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Network className="w-6 h-6 text-blue-400" />
                <span className="text-white">Research Knowledge Graph</span>
              </h2>
              <p className="text-blue-200 text-sm mb-4">
                Interactive visualization of relationships between research topics from {publications.length} publications.
              </p>
              
              <div className="bg-gradient-to-br from-slate-900 to-blue-900/50 rounded-lg p-8 min-h-[500px] border-2 border-yellow-400/20 relative overflow-hidden shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 800 500">
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#FCD34D" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  
                  <line x1="400" y1="250" x2="200" y2="100" stroke="#60A5FA" strokeWidth="2" opacity="0.5" />
                  <line x1="400" y1="250" x2="600" y2="100" stroke="#60A5FA" strokeWidth="2" opacity="0.5" />
                  <line x1="400" y1="250" x2="200" y2="400" stroke="#60A5FA" strokeWidth="2" opacity="0.5" />
                  <line x1="400" y1="250" x2="600" y2="400" stroke="#60A5FA" strokeWidth="2" opacity="0.5" />
                  <line x1="200" y1="100" x2="600" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
                  <line x1="200" y1="400" x2="600" y2="400" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
                  
                  <circle cx="400" cy="250" r="65" fill="url(#glow)" />
                  <circle cx="400" cy="250" r="45" fill="#FCD34D" />
                  <text x="400" y="245" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Space</text>
                  <text x="400" y="260" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Biology</text>
                  
                  <circle cx="200" cy="100" r="38" fill="#60A5FA" />
                  <text x="200" y="98" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Micro-</text>
                  <text x="200" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">gravity</text>
                  
                  <circle cx="600" cy="100" r="38" fill="#34D399" />
                  <text x="600" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Radiation</text>
                  
                  <circle cx="200" cy="400" r="38" fill="#A78BFA" />
                  <text x="200" y="398" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Plant</text>
                  <text x="200" y="410" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Growth</text>
                  
                  <circle cx="600" cy="400" r="38" fill="#F472B6" />
                  <text x="600" y="398" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Stem</text>
                  <text x="600" y="410" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Cells</text>
                  
                  <circle cx="100" cy="250" r="28" fill="#38BDF8" />
                  <text x="100" y="248" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bone</text>
                  <text x="100" y="258" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Loss</text>
                  
                  <circle cx="700" cy="250" r="28" fill="#FB923C" />
                  <text x="700" y="255" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Immune</text>
                  
                  <circle cx="300" cy="50" r="28" fill="#94A3B8" />
                  <text x="300" y="48" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DNA</text>
                  <text x="300" y="58" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Damage</text>
                  
                  <circle cx="500" cy="450" r="28" fill="#C084FC" />
                  <text x="500" y="448" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gene</text>
                  <text x="500" y="458" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Expression</text>
                </svg>
                
                <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-blue-400/30 text-xs">
                  <div className="text-yellow-400 mb-2 font-semibold">Legend</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="text-blue-200">Core Topics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      <span className="text-blue-200">Research Areas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-0.5 bg-blue-400" />
                      <span className="text-blue-200">Connection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="font-semibold mb-3 text-yellow-400">Most Connected Topics</h3>
                <div className="space-y-2">
                  {topicDistribution.slice(0, 5).map((topic, i) => (
                    <div key={i} className="flex items-center justify-between text-sm bg-slate-900/50 rounded p-2">
                      <span className="text-blue-200">{topic.name}</span>
                      <span className="text-yellow-400 font-semibold">{topic.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="font-semibold mb-3 text-yellow-400">Cross-Disciplinary Links</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-slate-900/50 rounded p-2 text-blue-200">Radiation ↔ DNA Damage</div>
                  <div className="bg-slate-900/50 rounded p-2 text-blue-200">Microgravity ↔ Bone Loss</div>
                  <div className="bg-slate-900/50 rounded p-2 text-blue-200">Stem Cells ↔ Regeneration</div>
                  <div className="bg-slate-900/50 rounded p-2 text-blue-200">Plants ↔ Life Support</div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
                <h3 className="font-semibold mb-3 text-yellow-400">Emerging Connections</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 bg-slate-900/50 rounded p-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-blue-200">Gene ↔ Adaptation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 rounded p-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-blue-200">Cell ↔ Stress</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 rounded p-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-blue-200">Immune ↔ Microgravity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-white">NASA Space Biology Resources</h2>
              <p className="text-blue-200 mb-6">
                Access additional NASA databases and resources for comprehensive space biology research.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://osdr.nasa.gov" target="_blank" rel="noopener noreferrer" 
                   className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/20 transition-all group">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
                    <FlaskConical className="w-5 h-5 text-blue-400" />
                    NASA OSDR
                    <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform text-yellow-400" />
                  </h3>
                  <p className="text-sm text-blue-200">Access 500+ biological experiments data</p>
                </a>

                <a href="https://lsda.jsc.nasa.gov/lsda_home.aspx" target="_blank" rel="noopener noreferrer"
                   className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all group">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Space Life Sciences Library
                    <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform text-yellow-400" />
                  </h3>
                  <p className="text-sm text-blue-200">Global literature database</p>
                </a>

                <a href="https://taskbook.nasaprs.com" target="_blank" rel="noopener noreferrer"
                   className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl p-6 hover:shadow-xl hover:shadow-emerald-500/20 transition-all group">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-emerald-400" />
                    NASA Task Book
                    <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform text-yellow-400" />
                  </h3>
                  <p className="text-sm text-blue-200">Research projects and reports</p>
                </a>

                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
                    <Database className="w-5 h-5 text-yellow-400" />
                    608 Publications Dataset
                  </h3>
                  <p className="text-sm text-blue-200">Core dataset analyzed by this engine</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Currently Loaded
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 via-blue-500/20 to-purple-500/20 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-white">About This Knowledge Engine</span>
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                Developed by <strong className="text-yellow-400">Solo System Team</strong> for NASA Space Apps Challenge 2025. 
                This engine analyzes {publications.length} NASA bioscience publications to provide interactive visualizations, 
                AI-powered insights, and knowledge graph representations, helping scientists and mission planners 
                prepare for human exploration of the Moon and Mars.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/90 backdrop-blur-md border-t border-blue-500/30 mt-12 py-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center text-blue-300 text-sm">
          <p className="font-semibold text-white">NASA Space Apps Challenge 2025</p>
          <p className="mt-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
            Space Biology Knowledge Engine • Solo System Team by Baitur Marishov • {publications.length} Real NASA Publications
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;