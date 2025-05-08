
import React from 'react';
import { SocialNetwork } from '../types';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Pin, 
  ScrollText 
} from 'lucide-react';

interface SocialIconProps {
  network: SocialNetwork;
  className?: string;
  size?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ 
  network, 
  className = "", 
  size = 16 
}) => {
  const getIcon = () => {
    switch (network) {
      case 'twitter':
        return <Twitter size={size} className={`text-social-twitter ${className}`} />;
      case 'facebook':
        return <Facebook size={size} className={`text-social-facebook ${className}`} />;
      case 'instagram':
        return <Instagram size={size} className={`text-social-instagram ${className}`} />;
      case 'linkedin':
        return <Linkedin size={size} className={`text-social-linkedin ${className}`} />;
      case 'youtube':
        return <Youtube size={size} className={`text-social-youtube ${className}`} />;
      case 'pinterest':
        return <Pin size={size} className={`text-social-pinterest ${className}`} />;
      case 'tiktok':
        return <ScrollText size={size} className={`text-social-tiktok ${className}`} />;
      default:
        return null;
    }
  };

  return getIcon();
};
