# ADmyBRAND Insights - Analytics Dashboard

A beautiful, modern analytics dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Designed for marketing agencies and their clients to monitor campaign performance and marketing insights.

![Dashboard Preview](https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=ADmyBRAND+Insights+Dashboard)

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Interactive Charts**: Line, bar, and donut charts using Recharts
- **Real-time Data**: Simulated real-time updates with refresh functionality
- **Advanced Data Table**: Sortable, searchable, and paginated campaign data
- **Modern UI**: Clean, professional design with smooth animations
- **TypeScript**: Full type safety and excellent developer experience

### Dashboard Components
- **Metric Cards**: Key performance indicators with trend indicators
- **Revenue Trend Chart**: 30-day revenue visualization with area fill
- **Traffic Sources**: Horizontal bar chart showing traffic distribution
- **Device Distribution**: Donut chart with center total and legend
- **Campaign Performance Table**: Advanced table with sorting and filtering

### Technical Features
- **Next.js 14**: App Router with server-side rendering
- **Tailwind CSS**: Custom design system with branded colors
- **Recharts**: Interactive and responsive chart library
- **Lucide React**: Beautiful, customizable icons
- **Responsive Layout**: Collapsible sidebar and mobile-optimized header

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Vite (via Next.js)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aidashboardass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically redirect to the dashboard at `/dashboard`.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to dashboard)
├── components/            # React components
│   ├── charts/           # Chart components (LineChart, BarChart, DonutChart)
│   ├── dashboard/        # Dashboard-specific components (MetricCard, DataTable)
│   └── layout/           # Layout components (Sidebar, Header, DashboardLayout)
├── lib/                  # Utilities and data
│   ├── data.ts           # Mock data generation
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── dashboard.ts      # Dashboard-related types
```

## 🎨 Design System

### Color Palette
- **Primary**: #3B82F6 (Blue 500)
- **Secondary**: #6366F1 (Indigo 500)
- **Success**: #10B981 (Emerald 500)
- **Warning**: #F59E0B (Amber 500)
- **Error**: #EF4444 (Red 500)
- **Background**: #F8FAFC (Slate 50)
- **Surface**: #FFFFFF
- **Text Primary**: #0F172A (Slate 900)
- **Text Secondary**: #64748B (Slate 500)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Heading 1**: 2.25rem (36px), font-weight: 700
- **Heading 2**: 1.875rem (30px), font-weight: 600
- **Heading 3**: 1.5rem (24px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400
- **Caption**: 0.875rem (14px), font-weight: 400

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality

The project uses:
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Strict mode for type safety
- **Prettier**: Code formatting (configured via ESLint)
- **Tailwind CSS**: Utility-first CSS framework

### Component Development

All components follow these principles:
- **TypeScript**: Full type safety with proper interfaces
- **Responsive**: Mobile-first design approach
- **Accessible**: ARIA labels and keyboard navigation
- **Reusable**: Modular components with props
- **Performance**: Optimized with React.memo and useMemo

## 📊 Data Structure

### Metric Card
```typescript
interface MetricCard {
  id: string;
  title: string;
  value: number;
  change: number; // Percentage change
  icon: string; // Lucide icon name
  format: 'currency' | 'number' | 'percentage';
  description?: string;
}
```

### Chart Data
```typescript
interface LineChartData {
  date: string;
  revenue: number;
  visitors?: number;
  conversions?: number;
}

interface BarChartData {
  source: string;
  visitors: number;
  color: string;
  percentage?: number;
}

interface DonutChartData {
  device: string;
  percentage: number;
  color: string;
  value?: number;
}
```

### Campaign Data
```typescript
interface CampaignData {
  id: string;
  name: string;
  clicks: number;
  conversions: number;
  cost: number;
  cpc: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  endDate?: string;
  conversionRate?: number;
  roi?: number;
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library
- [Inter](https://rsms.me/inter/) - Typography

## 📞 Support

For support, email support@admybrand.com or create an issue in this repository.

---

**Built with ❤️ by the ADmyBRAND team**
