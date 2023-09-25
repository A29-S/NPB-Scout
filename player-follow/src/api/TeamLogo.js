import BayStarsLogo from '../images/bayStars.png'; 
import BuffaloesLogo from '../images/new_buffaloes.png'; 
import CarpLogo from '../images/carp.png';
import DragonsLogo from '../images/dragons.png';
import GiantsLogo from '../images/giants.png';
import GoldenEaglesLogo from '../images/goldenEagles.png';
import HamFightersLogo from '../images/hamFighters.png';
import MarinesLogo from '../images/marines.png';
import SeibuLionsLogo from '../images/seibuLions.png';
import SoftbankHawksLogo from '../images/softbankHawks.png';
import SwallowsLogo from '../images/swallows.png';
import TigersLogo from '../images/tigers.png';



import React from 'react'

export function getTeamLogo(team) {
    switch (team) {
      case 'Tigers':
        return TigersLogo;
      case 'Giants':
        return GiantsLogo;
      case 'Dragons':
        return DragonsLogo;
      case 'Carp':
        return CarpLogo;
  
      case 'Buffaloes':
        return BuffaloesLogo;
      case 'Bay Stars':
        return BayStarsLogo;
      case 'Lotte Marines':
        return MarinesLogo;
      case 'Softbank Hawks':
        return SoftbankHawksLogo;
  
      case 'Ham Fighters':
        return HamFightersLogo;
      case 'Swallows':
        return SwallowsLogo;
      case 'Golden Eagles':
        return GoldenEaglesLogo;
      case 'Seibu Lions':
        return SeibuLionsLogo;
       
     
      default:
        return ''; // Return a default image or an empty string if no match is found
    }
  }
  
 export function getCardClass(team) {
    switch (team) {
      case 'Tigers':
        return 'TigersCard';
      case 'Giants':
        return 'GiantsCard';
      case 'Carp':
        return 'CarpCard';
      case 'Bay Stars':
        return 'BayStarsCard';
      case 'Dragons':
        return 'DragonsCard';
      case 'Swallows':
        return 'SwallowsCard';
      case 'Buffaloes':
        return 'BuffaloesCard';
      case 'Softbank Hawks':
        return 'SoftbankHawksCard';
      case 'Ham Fighters':
        return 'HamFightersCard';
      case 'Lotte Marines':
        return 'LotteMarinesCard';
      case 'Seibu Lions':
        return 'SeibuLionsCard';
      case 'Golden Eagles':
        return 'GoldenEaglesCard';
      default:
        return ''; // Return an empty string if no match is found
    }
  }