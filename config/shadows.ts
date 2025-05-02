import { elevations } from './elevations';
import { opacities } from './opacities';
import { radii } from './radii';

export const shadows = (color: string) => ({
  md: {
    elevation: elevations.md,
    shadowColor: color,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: opacities.sm,
    shadowRadius: radii.md
  }
});