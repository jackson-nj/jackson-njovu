
# Jack's Personal Portfolio Documentation

This documentation provides an overview of the structure, components, and features of Jack's personal portfolio website.

## Project Overview

This portfolio is a single-page application built with React, TypeScript, and Tailwind CSS. It showcases Jack's skills, projects, and professional journey in a modern, interactive way.

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on top of Tailwind
- **Canvas API**: For custom animations and visual effects
- **Lucide React**: Icon library

## Project Structure

```
/src
  /components
    /ui              # UI components from Shadcn
    AboutSection.tsx # About information
    ContactSection.tsx # Contact details and social links
    FooterSection.tsx # Footer information
    HeroSection.tsx  # Landing section with animations
    JourneySection.tsx # Career/educational timeline
    NavBar.tsx       # Navigation bar
    NowSection.tsx   # Current activities/focus
    ProjectsSection.tsx # Portfolio projects showcase
    SkillsSection.tsx # Skills and technologies
  /hooks
    use-in-view.tsx  # Custom hook for scroll animations
    use-mobile.tsx   # Mobile detection hook
    use-toast.ts     # Toast notifications hook
  /lib
    utils.ts         # Utility functions
  /pages
    Index.tsx        # Main page container
    NotFound.tsx     # 404 page
  App.tsx            # Main app component
  index.css          # Global styles
```

## Key Features

### 1. Interactive Hero Section
- **Background Video**: Full-screen background video with a dark overlay
- **Canvas Animations**: Custom liquid animations with grid patterns
- **3D Objects**: Interactive floating objects (cubes, spheres, pyramids)
- **Parallax Effects**: Scroll-based movement of background elements
- **Preloader**: Animated loading screen before content display
- **Text Animations**: Staggered entrance animations for text elements

### 2. Section Transitions
- Smooth scroll between sections
- Entrance animations when sections come into view
- Consistent section styling with gradients

### 3. Responsive Design
- Mobile-friendly layouts
- Adaptive components that look good on any screen size
- Touch-optimized interactions

### 4. Contact Section
- Social media links (GitHub, Instagram, Facebook)
- Contact information (phone, email)
- Visual feedback on interaction

## Animation System

The website uses several animation techniques:

1. **CSS Animations**: Using Tailwind's animation utilities and custom keyframes
2. **Canvas-based Animations**: Custom drawing for the hero section background
3. **Scroll-triggered Animations**: Elements animate as they enter the viewport
4. **Interactive Hover Effects**: Buttons and links have engaging hover states

## Custom Utilities

### Button Variations
- Primary buttons with shine and glow effects
- Outline buttons with subtle hover animations
- Pop effect on button press

### Text Animations
- Glow effects for emphasis
- Floating animations for dynamic text
- Typewriter effects for sequential text reveal

## Maintenance Guidelines

### Adding New Sections
1. Create a new component in the `/components` directory
2. Import and add the component to `src/pages/Index.tsx`
3. Add a navigation link in `NavBar.tsx` if needed

### Updating Content
- Most content can be updated directly in the respective section components
- For image updates, add new images to the `/components/img` directory

### Style Customization
- Global color schemes are defined in `tailwind.config.ts`
- Global styles and animations are in `src/index.css`
- Component-specific styles are included within each component

## Performance Considerations

- Large animations are optimized to prevent performance issues
- Background video is muted and set to autoplay for better UX
- Canvas animations adjust based on device capabilities
- Lazy loading is implemented for better initial load times

## Contact Information

For questions or issues with this portfolio:
- **Email**: jack@instay.com
- **Phone**: +260 977502711
- **GitHub**: https://github.com/jackson-nj
