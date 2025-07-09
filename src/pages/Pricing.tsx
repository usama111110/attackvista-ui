import { Check, Star, Shield, Zap, Globe, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { Logo } from "@/components/Logo";

const Pricing = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: "Starter",
      price: "99",
      period: "month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 50 devices protection",
        "3 AI detection models",
        "Real-time threat detection",
        "Basic analytics dashboard",
        "Email alerts",
        "Basic security training (2 hours)",
        "24/7 community support",
        "30-day data retention"
      ],
      popular: false,
      icon: Shield
    },
    {
      name: "Professional",
      price: "299",
      period: "month",
      description: "Ideal for growing companies with advanced needs",
      features: [
        "Up to 500 devices protection",
        "8 AI detection models",
        "AI-powered threat analysis",
        "Advanced analytics & reporting",
        "Multi-channel alerts (Email, SMS, Slack)",
        "Comprehensive security training (8 hours)",
        "Priority support with SLA",
        "90-day data retention",
        "Custom integrations",
        "Compliance reporting (SOC 2, GDPR)"
      ],
      popular: true,
      icon: Zap
    },
    {
      name: "Enterprise",
      price: "899",
      period: "month",
      description: "Complete security suite for large organizations",
      features: [
        "Unlimited device protection",
        "All 13 AI detection models",
        "Advanced AI threat prediction",
        "Custom dashboards & white-labeling",
        "Real-time API access",
        "Custom security training program",
        "Dedicated account manager",
        "1-year data retention",
        "Custom security policies",
        "On-premise deployment option",
        "Advanced compliance suite",
        "24/7 phone support"
      ],
      popular: false,
      icon: Globe
    }
  ];

  const addOns = [
    { name: "Additional Data Retention (per month)", price: "0.10", unit: "per GB" },
    { name: "Premium Threat Intelligence Feed", price: "199", unit: "per month" },
    { name: "Custom Security Training", price: "2,499", unit: "one-time" },
    { name: "Dedicated Infrastructure", price: "1,999", unit: "per month" }
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70' 
                  : 'bg-white/50 text-gray-700 hover:bg-white/80'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              NetworkFort
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Simple, Transparent Pricing
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose the perfect plan to secure your network infrastructure
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
            }`}>
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">30-day free trial • No credit card required</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? isDarkMode
                      ? 'bg-gradient-to-b from-blue-900/50 to-purple-900/50 border-blue-500/50 shadow-2xl'
                      : 'bg-gradient-to-b from-blue-50 to-purple-50 border-blue-200 shadow-xl'
                    : isDarkMode
                      ? 'bg-gray-900/40 border-gray-700/50 shadow-xl'
                      : 'bg-white/60 border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <plan.icon className={`w-12 h-12 mx-auto mb-4 ${
                    plan.popular ? 'text-blue-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-blue-500' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className={`p-8 rounded-3xl border ${
            isDarkMode 
              ? 'bg-gray-900/40 border-gray-700/50' 
              : 'bg-white/60 border-gray-200'
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Optional Add-ons
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Enhance your security posture with additional services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-gray-800/30 border-gray-600/30' 
                      : 'bg-gray-50/50 border-gray-200/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {addon.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${addon.price}
                      </span>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {addon.unit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Contact */}
          <div className="text-center mt-16">
            <div className={`inline-flex items-center gap-3 p-6 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
            }`}>
              <Users className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className="text-left">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Need a custom solution?
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contact our enterprise team for volume discounts and custom deployments
                </p>
              </div>
              <button className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;