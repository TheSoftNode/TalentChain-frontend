# Dashboard Components

This directory contains the modular dashboard components for the TalentChain Pro application. The dashboard has been redesigned as an enterprise-grade professional interface with a sidebar layout and component-based architecture.

## Component Structure

### Core Components

#### `DashboardSidebar` (`dashboard-sidebar.tsx`)
- **Purpose**: Main navigation sidebar with professional styling
- **Features**:
  - Responsive design with mobile overlay
  - Hedera brand colors and gradients
  - User profile section with wallet integration
  - Quick actions section
  - Search functionality
  - Active state indicators

#### `DashboardHeader` (`dashboard-header.tsx`)
- **Purpose**: Top navigation header with search and user controls
- **Features**:
  - Search bar with Hedera branding
  - Quick action buttons (Add Skill, Filter)
  - Notification center
  - User profile dropdown
  - Wallet connection status

#### `DashboardContent` (`dashboard-content.tsx`)
- **Purpose**: Main content orchestrator
- **Features**:
  - Layouts all dashboard sections
  - Handles responsive grid system
  - Manages animations and transitions
  - Integrates all sub-components

### Data Display Components

#### `DashboardStats` (`dashboard-stats.tsx`)
- **Purpose**: Displays key metrics in animated cards
- **Features**:
  - 4 main stat cards (Skill Tokens, Applications, Matches, Reputation)
  - Color-coded icons and gradients
  - Progress bars for reputation score
  - Hover animations and transitions

#### `SkillCard` (`skill-card.tsx`)
- **Purpose**: Individual skill token display
- **Features**:
  - Professional card design with hover effects
  - Skill level indicators and badges
  - Action dropdown menu (View, Edit, Remove)
  - Progress visualization
  - Hedera branding integration

#### `ApplicationCard` (`application-card.tsx`)
- **Purpose**: Job application tracking
- **Features**:
  - Status-based color coding
  - Progress indicators
  - Company and position information
  - Salary and location details
  - Action buttons for application management

### Interactive Components

#### `ActivityFeed` (`activity-feed.tsx`)
- **Purpose**: Timeline of recent activities
- **Features**:
  - Timeline design with connectors
  - Status indicators for each activity
  - Timestamp formatting
  - Action buttons for each activity
  - Empty state handling

#### `QuickActions` (`quick-actions.tsx`)
- **Purpose**: Easy access to common tasks
- **Features**:
  - Grid layout of action cards
  - Color-coded icons
  - Badge indicators for new/hot features
  - Hover animations
  - Progress tracking

#### `NotificationCenter` (`notification-center.tsx`)
- **Purpose**: System notifications and alerts
- **Features**:
  - Unread count badges
  - Type-based color coding (success, warning, info, error)
  - Timestamp formatting
  - Action buttons for notifications
  - Read/unread state management

## Usage

### Basic Implementation

```tsx
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  const stats = {
    totalSkillTokens: 8,
    activeApplications: 3,
    completedMatches: 2,
    reputationScore: 87,
  };

  const skillTokens = [
    {
      tokenId: 1,
      category: "React Development",
      level: 8,
      uri: "ipfs://...",
      owner: "0.0.123456"
    }
  ];

  return (
    <DashboardContent 
      stats={stats}
      skillTokens={skillTokens}
      applications={[]}
    />
  );
}
```

### Layout Integration

```tsx
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="lg:pl-72">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Design System

### Colors
- **Primary**: Hedera Blue (`#007aff`)
- **Secondary**: Blue gradient (`from-hedera-500 to-blue-600`)
- **Success**: Green (`text-green-600`)
- **Warning**: Yellow (`text-yellow-600`)
- **Error**: Red (`text-red-600`)
- **Info**: Blue (`text-blue-600`)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace for technical content

### Spacing
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid Gap**: `gap-6` for stats, `gap-8` for main content
- **Card Padding**: `p-6` for content, `p-4` for compact items

### Animations
- **Entrance**: Framer Motion with staggered delays
- **Hover**: Scale and opacity transitions
- **Loading**: Spinner with Hedera colors

## Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Stacked layout, mobile sidebar
- **Tablet**: `768px - 1024px` - 2-column grid
- **Desktop**: `> 1024px` - 3-column layout with sidebar

### Sidebar Behavior
- **Desktop**: Always visible, fixed width (288px)
- **Mobile**: Overlay with backdrop, slide animation

## Accessibility

### Features
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Indicators**: Visible focus states for all interactive elements

### Best Practices
- Use semantic HTML elements
- Provide alt text for images
- Ensure sufficient color contrast
- Test with screen readers

## Performance

### Optimizations
- **Code Splitting**: Components are lazy-loaded where appropriate
- **Image Optimization**: Next.js Image component for icons
- **Animation Performance**: Hardware-accelerated CSS transforms
- **Bundle Size**: Tree-shaking for unused components

### Loading States
- **Skeleton Loading**: Placeholder content while data loads
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Error Boundaries**: Graceful error handling

## Customization

### Theming
Components use CSS custom properties for easy theming:

```css
:root {
  --hedera-primary: #007aff;
  --hedera-secondary: #0369a1;
  --background: hsl(var(--background));
  --foreground: hsl(var(--foreground));
}
```

### Component Props
All components accept props for customization:

```tsx
<DashboardStats 
  stats={stats}
  className="custom-stats"
  showProgress={true}
/>
```

## Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filtering**: Multi-criteria search and filtering
- **Export Functionality**: PDF/CSV export of dashboard data
- **Custom Widgets**: User-configurable dashboard layouts
- **Analytics Integration**: Detailed performance metrics

### Technical Improvements
- **TypeScript**: Full type safety for all components
- **Testing**: Unit and integration tests
- **Documentation**: Storybook integration
- **Performance**: Virtual scrolling for large datasets 