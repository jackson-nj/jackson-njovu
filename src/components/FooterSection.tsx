
import React from 'react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/50">
          <p>© {currentYear} Jack. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with React & TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
